'use client'
import React, { useEffect, useState } from 'react';
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

    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    ButtonGroup,
    Flex,
    IconButton,
    Divider,

} from '@chakra-ui/react';
import { EventTicketType } from '@/types';
import { useApp, useEvent } from '@/hooks';
import { FaQuestionCircle } from "react-icons/fa";
import { formatPrice } from '@/tools';

export const TicketForm: React.FC<{ ticket?: EventTicketType | null, sessionId: number | undefined }> = ({ ticket, sessionId }) => {

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<EventTicketType>();
    const { setRefresh } = useApp();
    const [prices, setPrices] = useState<any>();

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

    useEffect(() => {
        setPrices(calculateFee(watch('price'), watch('include_fee')))
        console.log(watch('include_fee'))
    }, [watch('price'), watch('include_fee')])

    const handleCreate: SubmitHandler<EventTicketType> = async (formData) => {

        sessionId && await handleCreateTicket(formData, sessionId).then(response => {
            setRefresh(prev => !prev);
        });
    };

    const handleUpdate: SubmitHandler<EventTicketType> = async (formData) => {
        sessionId && ticket?.id && await handleUpdateTicket(formData, sessionId, ticket?.id).then(response => {
            setRefresh(prev => !prev);
        });
    };

    const calculateFee = (amount: string, includeFee: boolean | number) => {
        const price = parseFloat(amount);
        const fixedFee = 2;
        const percentageFee = price > 25 ? (price * (10 / 100)) : 10 * (0 / 100); // R$ 0,00
        const totalFee = fixedFee + percentageFee; // R$ 5,00

        if (includeFee) {
            return {
                total: price - totalFee,
                totalFee: totalFee,
                buyerPrice: price,
                info: 'Ao absorver a taxa de serviço, ela será incluída no preço final de venda e não será mostrada ao comprador'
            };
        }
        return {
            total: price,
            totalFee: totalFee,
            buyerPrice: price + totalFee,
            info: 'A taxa de serviço é repassada ao comprador, sendo exibida junto com o valor do ingresso'
        };

    }

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
                    <Select {...register('ticket_type', {
                        required: 'Ticket type is required',
                        onChange: () => setValue('price', '0')
                    })} placeholder='Selecione...'>
                        <option value='paid'>Pago</option>
                        <option value='free'>Gratuito</option>
                    </Select>

                    <FormErrorMessage>{errors.ticket_type && errors.ticket_type.message}</FormErrorMessage>
                </FormControl>

                {watch('ticket_type') && <Stack borderRadius='lg' bg='white' borderWidth='1px' spacing='4' p='4'>
                    <FormControl isDisabled={watch('ticket_type') === 'free' || ticket?.is_selling} isInvalid={!!errors.price}>
                        <FormLabel htmlFor='price'>Preço</FormLabel>
                        <HStack spacing='4'>
                            <InputGroup flex='2'>
                                <InputLeftElement> R$ </InputLeftElement>
                                <Input
                                    type='tel'
                                    placeholder='0,00'
                                    {...register('price', { required: !isTicketFree && 'Price is required' })}
                                />
                            </InputGroup>
                        </HStack>
                        <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                    </FormControl>
                    {watch('ticket_type') === 'paid' && <Stack fontSize={'sm'} spacing='4'>
                        <Stack>
                            <HStack>
                                <Box flex='1'>Valor a receber</Box>
                                <Box>{formatPrice(prices.total)}</Box>
                            </HStack>
                            <HStack>
                                <Box flex='1'>Taxa</Box>
                                <Box>{formatPrice(prices.totalFee)}</Box>
                            </HStack>
                        </Stack>
                        <Divider />
                        <HStack>
                            <Box flex='1'>Valor do comprador</Box>
                            <Box>{formatPrice(prices.buyerPrice)}</Box>
                        </HStack>

                        <FormControl display='flex' alignItems='center'>
                            <Switch mr='2' isChecked={!!watch('include_fee')} {...register('include_fee')} />
                            <FormLabel mb='0'> Absorver taxa de serviço? </FormLabel>
                        </FormControl>
                        <Text color='gray.600'> {prices.info} </Text>
                    </Stack>}

                </Stack>}

                <Stack borderRadius='lg' bg='white' borderWidth='1px' spacing='4' p='4'>
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
                        <FormLabel mb='0'> Visibilidade </FormLabel>
                        <Switch isChecked={!!watch('is_visible')} {...register('is_visible')} />
                    </FormControl>

                </Stack>
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
