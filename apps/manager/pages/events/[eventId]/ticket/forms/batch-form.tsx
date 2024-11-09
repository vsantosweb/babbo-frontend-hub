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
  Select
} from '@chakra-ui/react';
import { EventTicketBatchType } from '@/types';
import { useApp, useEvent } from '@/hooks';
import moment from 'moment';

export const BatchForm: React.FC<{ batch?: EventTicketBatchType | null }> = ({ batch }) => {

  const { register, handleSubmit, setValue, getValues,  formState: { errors, isSubmitting } } = useForm<EventTicketBatchType>();
  const { setRefresh } = useApp();

  const state = batch?.id ? 'Atualizar' : 'Adicionar';

  const formActionText = {
    submitText: `${state} lote`,
    formHeader: `${state} lote`
  }

  const { event } = useEvent();

  const { handleCreateBatch, handleUpdateBatch } = useEvent();

  useEffect(() => {
    if (batch?.id) {
      setValue('name', batch.name, { shouldValidate: true });
      setValue('start_date', moment(batch.start_date).format('YYYY-MM-DD'), { shouldValidate: true });
      setValue('end_date', moment(batch.end_date).format('YYYY-MM-DD'), { shouldValidate: true });
      setValue('sale_type', batch.sale_type, { shouldValidate: true });
    }
  }, [batch]);

  const handleCreate: SubmitHandler<EventTicketBatchType> = async (formData) => {

    batch?.event_session_id && event?.id && await handleCreateBatch(formData, batch?.event_session_id).then(response => {
      setRefresh(prev => !prev);
    });
  };

  const handleUpdate: SubmitHandler<EventTicketBatchType> = async (formData) => {
    (batch?.event_session_id && batch?.id) && batch && event?.id && await handleUpdateBatch(formData, batch?.event_session_id, batch.id).then(response => {
      setRefresh(prev => !prev);
    });
  };

  return (
    <Stack pb='4' w='100%' mt={8}>
      <Heading size='lg'>{formActionText.formHeader}</Heading>
      <Text>
        Use o lote para definir os ingressos que serão vendidos em uma sessão específica do evento
      </Text>
      <Stack spacing='4' as='form' onSubmit={handleSubmit(!batch?.id ? handleCreate : handleUpdate)}>

        <FormControl isInvalid={!!errors.sale_type}>
          <FormLabel htmlFor='name'>Tipo de lote</FormLabel>
          <Select placeholder='Selecione...' {...register('sale_type', { required: 'Sale Type is required' })}>
            <option value='individual'>Individual</option>
            <option value='batch'>Em lote</option>
          </Select>
          <FormErrorMessage>{errors.sale_type && errors.sale_type.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='name'>Nome do lote</FormLabel>
          <Input
            id='name'
            placeholder='Ex: Lote 1'
            {...register('name', { required: 'Name is required' })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <Stack direction={{ base: 'row' }}>
          <FormControl isInvalid={!!errors.start_date}>
            <FormLabel htmlFor='start_date'>Data de início</FormLabel>
            <Input
              id='start_date'
              type='date'
              {...register('start_date', { required: 'Start date is required' })}
            />
            <FormErrorMessage>{errors.start_date && errors.start_date.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.end_date}>
            <FormLabel htmlFor='end_date'>Data de término</FormLabel>
            <Input
              id='end_date'
              type='date'
              {...register('end_date', { required: 'End date is required' })}
            />
            <FormErrorMessage>{errors.end_date && errors.end_date.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <HStack alignSelf='flex-end'>
          <Button alignSelf='flex-end' variant='ghost' type='submit'>Cancelar</Button>
          <Button isLoading={isSubmitting} alignSelf='flex-end' type='submit'>{formActionText.submitText}</Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
