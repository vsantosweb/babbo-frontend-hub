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
} from '@chakra-ui/react';
import { EventSessionType } from '@/types';
import { useApp, useEvent } from '@/hooks';
import moment from 'moment';

export const SessionForm: React.FC<{ eventSession: EventSessionType | null }> = ({ eventSession }) => {

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<EventSessionType>();
    const { setRefresh } = useApp();

    const state = eventSession ? 'Atualizar': 'Adicionar';
    
    const formActionText = {
        submitText:  `${state} sessão`,
        formHeader: `${state} sessão`
    }

    const { eventCustomer } = useEvent();

    const { handleCreateSession, handleUpdateSession } = useEvent();

    // Define valores iniciais para edição
    useEffect(() => {

        if (eventSession) {
            setValue('name', eventSession.name, { shouldValidate: true });
            setValue('event_date', moment(eventSession.event_date).format('YYYY-MM-DD'), { shouldValidate: true });
        }
    }, [eventSession]);

    const handleCreate: SubmitHandler<EventSessionType> = async (formData) => {
        eventCustomer?.id && await handleCreateSession(formData, eventCustomer?.id).then(response => {
            setRefresh(prev => !prev)
        })
    };

    const handleupdate: SubmitHandler<EventSessionType> = async (formData) => {

        eventSession && eventCustomer?.id && await handleUpdateSession(formData, eventCustomer?.id, eventSession.id).then(response => {
            setRefresh(prev => !prev)
        })

    };

    return (
        <Stack pb='4' w='100%' mt={8}>
            <Heading size='lg'>{formActionText.formHeader}</Heading>
            <Text>
                Use a sessão para separar os dias em que seu evento irá 
                ocorrer e separar suas vendas por sessão
            </Text>
            <Stack spacing='4' as='form' onSubmit={handleSubmit(!eventSession ? handleCreate : handleupdate)}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor='name'>Nome da sessão</FormLabel>
                    <Input
                        id='name'
                        placeholder='Ex: Pré-venda...'
                        {...register('name', { required: 'Name is required' })}
                    />
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.event_date}>
                    <FormLabel htmlFor='event_date'>Data do evento</FormLabel>
                    <Input
                        id='event_date'
                        type='date'
                        {...register('event_date', { required: 'Event date is required' })}
                    />
                    <FormErrorMessage>
                        {errors.event_date && errors.event_date.message}
                    </FormErrorMessage>
                </FormControl>

                <HStack alignSelf='flex-end'>
                    <Button alignSelf='flex-end' variant='ghost' type='submit'>Cancelar</Button>
                    <Button isLoading={isSubmitting} alignSelf='flex-end' type='submit'>{formActionText.submitText}</Button>
                </HStack>
            </Stack>
        </Stack>
    );
};
