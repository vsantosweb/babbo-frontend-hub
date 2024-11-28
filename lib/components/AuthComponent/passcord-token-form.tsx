'use client'

import { useAuth } from '@/hooks';
import Layout from '@/layouts'
import { CredentialsType } from '@/types';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Divider,
    HStack,
    StackDivider,
    InputGroup,
    InputLeftElement,
    PinInput,
    PinInputField,
    FormHelperText,
    Alert
} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { AuthFormContext } from '.';

export default function PasswordTokenForm() {
    const { handleSubmit, register, reset, control, setValue, watch, formState: { isValid, errors, isSubmitting } } = useForm({ mode: 'onChange' });

    const { validateRecoveryToken } = useAuth();

    const [errorMessage, setErrorMessage] = useState<string | null>();
    const context = useContext(AuthFormContext);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {

        await validateRecoveryToken(formData.token).then((response: any) => {
            if (!response?.success) {
                setErrorMessage('Erro ao validar: Token inválido ou expirado.');
                reset();
                setValue('token', '')
                return
            }
            
            context?.setActiveForm('reset-form');
            sessionStorage.setItem('reset-token', formData.token);

        })
    }
    console.log(watch(), 'watch')
    return (
        <form>
            <Box rounded={'lg'}>
                <Stack spacing={4}>
                    <FormControl spacing={2} as={Stack}>
                        <FormLabel>Insira o código de verificação</FormLabel>
                        <Text size='sm'></Text>
                        <HStack justifyContent='space-between' w={'100%'}>
                            <Controller {...register('token', { required: true })} control={control}
                                render={({ field }) => {
                                    return <PinInput isDisabled={isSubmitting} {...field} onComplete={() => handleSubmit(onSubmit)()} otp>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                }}
                            />

                        </HStack>
                        <FormHelperText>
                            Foi enviado um código de verificação
                            de 6 digitos no seu email, digite o código para
                            continuar com a recuperação de senha
                        </FormHelperText>
                        {errorMessage && <Alert fontSize='sm' status='error' variant='solid'>{errorMessage}</Alert>}
                    </FormControl>

                    <Stack spacing='4'>

                        <Button
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            type='submit'
                            bg={'primary.400'} color={'white'}
                            _hover={{ bg: 'primary.500', }}>
                            Aguardando token...
                        </Button>
                    </Stack>

                </Stack>
            </Box>
        </form>
    )
}