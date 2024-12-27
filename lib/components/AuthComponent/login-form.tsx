'use client'

import { useAuth } from '@/hooks';
import Layout from '@/layouts'
import { CredentialsType } from '@/types';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  Divider,
  HStack,
} from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { AuthFormContext } from '.';

export default function LoginForm() {
  const { handleSubmit, register, formState: { isValid, isSubmitting } } = useForm({ mode: 'onChange' });

  const context = useContext(AuthFormContext)
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState(null);

  const submitCredentials = async (credentials: CredentialsType) => {

    await login(credentials).then((response: any) => {
      if (!response?.success) {
        return setErrorMessage(response?.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitCredentials)}>
      <Box
        rounded={'lg'}
      >
        <Stack spacing={2}>
          <FormControl id='email'>
            <FormLabel>Endereço de email</FormLabel>
            <Input {...register('email', { required: true })} type='email' placeholder='Insira seu e-mail' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Senha</FormLabel>
            <Input {...register('password', { required: true })} type='password' placeholder='Insira sua senha' />
          </FormControl>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <Stack spacing='4'>
            <Box textAlign='right'>
              <Button variant='link' onClick={() => context?.setActiveForm('recovery-form')}>Esqueci a senha</Button>
            </Box>

            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type='submit'
              bg={'primary.400'} color={'white'}
              _hover={{ bg: 'primary.500', }}>
              Entrar
            </Button>
            
            <Text>Não possui uma conta? <Button onClick={() => context?.setActiveForm('register-form')} variant='link'>Registre-se</Button></Text>
          </Stack>
          {/* Texto do Divider */}
          <HStack spacing='2' textAlign="center" mb='2' >
            <Divider />
            <Text flex='1'>ou </Text>
            <Divider />
          </HStack>

          {/* Botões de Login Social */}
          <Stack direction="column" spacing={4}>
            <Button variant='outline' leftIcon={<FaGoogle />} w="full">Continuar com Google</Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  )
}