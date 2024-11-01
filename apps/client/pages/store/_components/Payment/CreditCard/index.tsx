import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Button,
  Text,
  Heading,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

const CreditCardForm = () => {
  const { register, watch, handleSubmit, setValue, formState: { errors, isValid, isSubmitting } } = useFormContext();
  //formState?.errors?.event_image

  console.log(watch())
  return (
    <Box>
      <Heading fontSize="lg" fontWeight="bold" mb="4">
        Dados do Titular do Cartão
      </Heading>

      {/* Campo Número do Cartão */}
      <FormControl mb="4" isInvalid={!!errors?.number}>
        <FormLabel>Número do Cartão</FormLabel>
        <Input 
          as={InputMask}
          alwaysShowMask={false}
          mask='9999 9999 9999 9999'
          maskChar={null}
          placeholder='0000 0000 0000 0000'
          {...register('number', {
            onBlur: e => setValue('number', e.target.value.replace(/\D/g, ''))
          })}
        />
        <FormErrorMessage>{errors?.number?.message as string}</FormErrorMessage>
        <Flex mt="2" justify="space-between">
          <Text fontSize="sm" color="gray.500">Visa, Mastercard, American Express...</Text>
        </Flex>
      </FormControl>


      {/* Campo Nome Impresso no Cartão */}
      <FormControl mb="4" isInvalid={!!errors?.holder_name}>
        <FormLabel>Nome Impresso no Cartão</FormLabel>
        <Input {...register('holder_name')} type="text" placeholder="Nome conforme impresso no cartão" />
        <FormErrorMessage>{errors?.holder_name?.message as string}</FormErrorMessage>

      </FormControl>


      {/* Campos Data de Vencimento e CVV */}
      <Flex mb="4" gap='4'>
        <FormControl mb="4" isInvalid={!!errors?.exp_date}>
          <FormLabel>Data de Vencimento</FormLabel>
          <Input as={InputMask}
            placeholder='MM/AA'
            alwaysShowMask={false}
            maskChar={null}
            mask='99/99'
            {...register('exp_date')}
          />
          <FormErrorMessage>{errors?.exp_date?.message as string}</FormErrorMessage>

        </FormControl>

        <FormControl isInvalid={!!errors?.cvv}>
          <FormLabel>CVV</FormLabel>
          <Input maxLength={3} {...register('cvv')} type="text" placeholder="123" />
          <FormErrorMessage>{errors?.cvv?.message as string}</FormErrorMessage>

        </FormControl>
      </Flex>


      {/* Campo Número de Parcelas */}
      <FormControl mb="4" isInvalid={!!errors?.installments}>
        <FormLabel>Número de Parcelas</FormLabel>
        <Select {...register('installments')} placeholder="Selecione a quantidade de parcelas">
          <option value="1">1x sem juros</option>
          <option value="2">2x sem juros</option>
          <option value="3">3x sem juros</option>
          <option value="4">4x sem juros</option>
          <option value="5">5x sem juros</option>
        </Select>
        <FormErrorMessage>{errors?.installments?.message as string}</FormErrorMessage>
      </FormControl>
      {/* Campo Celular */}
      <FormControl mb="4" isInvalid={!!errors?.number}>
        <FormLabel>CPF</FormLabel>
        <Input as={InputMask}
          placeholder='000.000.000-00'
          alwaysShowMask={false}
          maskChar={null}
          mask='999.999.999-99'
          {...register('document')}
        />
      </FormControl>
      {/* Campo Celular */}
      {/* <FormControl mb="4">
        <FormLabel>Celular</FormLabel>
        <Input type="tel" placeholder="(00) 00000-0000" />
      </FormControl> */}

      {/* Campo Email */}
      {/* <FormControl mb="4">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="seuemail@exemplo.com" />
      </FormControl> */}
      <Button
      isLoading={isSubmitting}
      //  isDisabled={!isValid} 
      type={'submit'} w='100%'> Comprar ingresso</Button>
    </Box>
  );
};

export default CreditCardForm;
