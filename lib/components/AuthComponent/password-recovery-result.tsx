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
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { AuthFormContext } from '.';

export default function PasswordRecoveryResult() {
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
        <Stack spacing={4}>
            <Alert
                status='success'
                variant='solid'
                bg='none'
                color='green.400'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
            >
                <AlertIcon color={'green.300'} boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>Senha alterada com sucesso!</AlertTitle>
                <AlertDescription maxWidth='sm'>Sua senha foi alterada, faça login novamente com sua nova senha</AlertDescription>
            </Alert>
            <Button onClick={() => context?.setActiveForm('login-form')} variant='outline'>Ir para o login</Button>
        </Stack>
    )
}