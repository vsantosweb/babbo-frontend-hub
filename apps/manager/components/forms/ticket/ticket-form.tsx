'use client'
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Heading,
    Text,
    Stack,
    HStack,
    FormHelperText,
    Box,
    Switch,
    Checkbox,
    InputGroup,
    InputLeftElement,
    Textarea,
    Select,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { EventTicketType } from '@/types';
import { useApp, useEvent } from '@/hooks';
import { TextArea } from '@adobe/react-spectrum';

export const TicketForm: React.FC<{ ticket?:  EventTicketType | null, sessionId: number|undefined }> = ({ ticket, sessionId }) => {

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<EventTicketType>();
    const { setRefresh } = useApp();

    const state = ticket?.id ? 'Atualizar' : 'Adicionar novo';

    const isTicketFree = watch('ticket_type') === 'free';

    const formActionText = {
        submitText: `${state} ingresso`,
        formHeader: `${state} ingresso`
    }

    const { handleCreateTicket, handleUpdateTicket } = useEvent();

    useEffect(() => {
        if (ticket?.id) {
            setValue('name', ticket.name, { shouldValidate: true });
            setValue('ticket_type', ticket.ticket_type, { shouldValidate: true });
            setValue('quantity', ticket.quantity, { shouldValidate: true });
            setValue('price', ticket.price, { shouldValidate: true });
            setValue('include_fee', ticket.include_fee, { shouldValidate: true });
            setValue('is_visible', ticket.is_visible, { shouldValidate: true });
            setValue('min_quantity', ticket.min_quantity, { shouldValidate: true });
            setValue('max_quantity', ticket.max_quantity, { shouldValidate: true });
            setValue('description', ticket.description, { shouldValidate: true });
        }
    }, [ticket]);

    const handleCreate: SubmitHandler<EventTicketType> = async (formData) => {
        
        sessionId && await handleCreateTicket(formData, sessionId).then(response => {
            setRefresh(prev => !prev);
        });
    };

    const handleUpdate: SubmitHandler<EventTicketType> = async (formData) => {
        console.log(sessionId , ticket?.id)
        sessionId && ticket?.id && await handleUpdateTicket(formData, sessionId, ticket?.id).then(response => {
            setRefresh(prev => !prev);
        });
    };
    console.log(isTicketFree, 'isTicketFree')
    return (
        <Stack pb='4' w='100%' mt={8}>
            <Stack spacing='4'>
                <Heading size='lg'>{formActionText.formHeader}</Heading>
                <Text>
                    Use o formulário para adicionar ou atualizar ingressos do evento
                </Text>
                {ticket?.is_selling && <Alert borderRadius={'lg'} size='sm' status='warning'>
                    <AlertIcon /> Alguns dados não serão possível alterar pois o ingresso já possui vendas
                </Alert>
                }
            </Stack>
            <Stack spacing='4' as='form' onSubmit={handleSubmit(!ticket?.id ? handleCreate : handleUpdate)}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Nome do ingresso</FormLabel>
                    <Input
                        id='name'
                        placeholder='Ex: Ingresso VIP'
                        {...register('name', { required: 'Name is required' })}
                    />
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>

                <FormControl isDisabled={ticket?.is_selling} isInvalid={!!errors.ticket_type}>
                    <FormLabel htmlFor='ticket_type'>Tipo do ingresso</FormLabel>
                    <Select {...register('ticket_type', { required: 'Ticket type is required', 
                        onChange: () => setValue('price', 0) })} placeholder='Selecione...'>
                        <option value='paid'>Pago</option>
                        <option value='free'>Gratuito</option>
                    </Select>

                    <FormErrorMessage>{errors.ticket_type && errors.ticket_type.message}</FormErrorMessage>
                </FormControl>

                <FormControl isDisabled={watch('ticket_type') === 'free' || ticket?.is_selling} isInvalid={!!errors.price}>
                    <FormLabel htmlFor='price'>Preço</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'> R$ </InputLeftElement>
                        <Input
                            type='tel'
                            placeholder='0,00'
                            {...register('price', { required: !isTicketFree && 'Price is required' })}
                        />

                    </InputGroup>
                    <Checkbox mt='2' isChecked={!!watch('include_fee')} {...register('include_fee')}>Absorver taxa de serviço?</Checkbox>
                    <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.quantity}>
                    <FormLabel htmlFor='quantity'>Quantidade</FormLabel>
                    <Input
                        id='quantity'
                        type='number'
                        {...register('quantity', { required: 'Quantity is required' })}
                    />
                    <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.price}>
                    <FormLabel htmlFor='price'>Ingressos por pedido</FormLabel>
                    <HStack>

                        <Box>
                            <Input
                                id='price'
                                type='number'
                                step='0.01'
                                {...register('min_quantity')}
                            />
                            <FormHelperText fontSize={'xs'}>Quantitdade mínima</FormHelperText>
                        </Box>
                        <Box>
                            <Input
                                id='price'
                                type='number'
                                step='0.01'
                                {...register('max_quantity')}
                            />
                            <FormHelperText fontSize={'xs'}>Quantidade máxima</FormHelperText>
                        </Box>
                    </HStack>
                </FormControl>




                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'> Visibilidade </FormLabel>
                    <Switch isChecked={!!watch('is_visible')} {...register('is_visible')} id='email-alerts' />
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                    <FormLabel htmlFor='description'>Descrição</FormLabel>
                    <Textarea placeholder='Ex: Acesso VIP com brindes' {...register('description')}></Textarea>

                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                </FormControl>

                <HStack alignSelf='flex-end'>
                    <Button alignSelf='flex-end' variant='ghost' type='submit'>Cancelar</Button>
                    <Button isLoading={isSubmitting} alignSelf='flex-end' type='submit'>{formActionText.submitText}</Button>
                </HStack>
            </Stack>
        </Stack>
    );
};
