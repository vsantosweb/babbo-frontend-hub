'use client'

import { useAuth } from '@/hooks';
import Layout from '@/layouts'
import { CredentialsType } from '@/types';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    InputGroup,
    InputLeftElement,
    Alert,
} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { AuthFormContext } from '.';

export default function PasswordRecoveryForm() {
    const { handleSubmit, register, formState: { isValid, errors, isSubmitting } } = useForm({ mode: 'onChange' });

    const { requestPasswordRecovery } = useAuth();

    const [errorMessage, setErrorMessage] = useState<string | null>();
    const context = useContext(AuthFormContext);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        await requestPasswordRecovery(formData.email).then((response: any) => {
            if (!response?.success) {
                setErrorMessage('Erro ao solicitar a recuperação de senha')
                return
            }
            context?.setActiveForm('token-form')
        }).catch(error => {
            console.log(error.response.message, 'ascsac')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box rounded={'lg'}>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Digite seu e-mail para redefinir sua senha</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <EmailIcon color='gray.300' />
                            </InputLeftElement>
                            <Input {...register('email', { required: true })} type='tel' placeholder='Email' />
                        </InputGroup>
                    </FormControl>
                    {errorMessage && <Alert fontSize='sm' status='error' variant='solid'>{errorMessage}</Alert>}

                    <Stack spacing='4'>

                        <Button
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            type='submit'
                            bg={'primary.400'} color={'white'}
                            _hover={{ bg: 'primary.500', }}>
                            Envia email para redefinir senha
                        </Button>
                        <Button onClick={() => context?.setActiveForm('login-form')} variant='outline'>Voltar para login</Button>
                    </Stack>

                </Stack>
            </Box>
        </form>
    )
}