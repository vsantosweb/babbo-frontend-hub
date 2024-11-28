'use client'

import { useAuth } from '@/hooks';
import Layout from '@/layouts';
import { CredentialsType, ResetPasswordType } from '@/types';
import { 
    Box, 
    FormControl, 
    FormLabel, 
    Input, 
    Stack, 
    Button, 
    FormErrorMessage 
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormContext } from '.';

type PasswordResetFormData = ResetPasswordType;

export default function PasswordResetForm() {

    const { handleSubmit, register, formState: { isValid, errors, isSubmitting }, watch } = useForm<PasswordResetFormData>({ mode: 'onChange' });
    
    const { resetPassword } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const context = useContext(AuthFormContext);

    const submitCredentials = async (credentials: ResetPasswordType) => {

        try {
            const response = await resetPassword(credentials);
            console.log(response, 'response')
            if (!response?.success) {
                setErrorMessage(response?.message || 'Erro ao redefinir senha');
                return;
            }
            
            context?.setActiveForm('reset-result');
            sessionStorage.removeItem('reset-token');

        } catch (error) {
            setErrorMessage('Erro inesperado ao redefinir senha');
        }
    }

    const password = watch('password'); // Monitora o valor do campo "password" para validar a confirmação

    return (
        <form onSubmit={handleSubmit(submitCredentials)}>
            <Box rounded={'lg'}>
                <Stack spacing={4}>
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Nova senha</FormLabel>
                        <Input
                            type='password'
                            placeholder='Insira sua senha'
                            {...register('password', {
                                required: 'A senha é obrigatória',
                                minLength: {
                                    value: 8,
                                    message: 'A senha deve ter pelo menos 8 caracteres',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password_confirmation}>
                        <FormLabel>Repetir nova senha</FormLabel>
                        <Input
                            type='password'
                            placeholder='Confirme sua nova senha'
                            {...register('password_confirmation', {
                                required: 'Confirmação da senha é obrigatória',
                                validate: (value) =>
                                    value === password || 'As senhas não coincidem',
                            })}
                        />
                        <FormErrorMessage>{errors.password_confirmation?.message}</FormErrorMessage>
                    </FormControl>

                    {errorMessage && (
                        <Box color="red.500" fontSize="sm">
                            {errorMessage}
                        </Box>
                    )}

                    <Stack spacing='4'>
                        <Button
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            type='submit'
                            bg={'primary.400'}
                            color={'white'}
                            _hover={{ bg: 'primary.500' }}>
                            Redefinir senha
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </form>
    );
}
