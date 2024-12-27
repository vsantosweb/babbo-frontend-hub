'use client'

import { Box, Button, FormControl, FormLabel, Input, Stack, FormErrorMessage } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { RegisterFormType } from '@/types';


export default function RegisterForm() {
    const { handleSubmit, register, formState: { errors, isValid, isSubmitting }, watch } = useForm<RegisterFormType>({ mode: 'onChange' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { registerCustomer } = useAuth();
    const password = watch('password'); // Observa o valor da senha para a validação da confirmação

    const onSubmit = async (data: RegisterFormType) => {
        try {

           await registerCustomer(data).then(response => {
                console.log(response, 'response')
            })
            // Aqui você adicionaria a lógica para registrar o usuário, como uma chamada para uma API
            console.log("Dados do formulário:", data);
        } catch (error) {
            console.log(error, 'errorerrorerror')
            setErrorMessage("Erro ao registrar. Tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box rounded={'lg'}>
                <Stack spacing={4}>
                    {/* Nome */}
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            type='text'
                            placeholder='Seu nome'
                            {...register('name', { required: 'O nome é obrigatório' })}
                        />
                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                    </FormControl>

                    {/* E-mail */}
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            placeholder='email@exemplo.com'
                            {...register('email', {
                                required: 'O e-mail é obrigatório',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Formato de e-mail inválido',
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Celular */}
                    {/* <FormControl isInvalid={!!errors.phone}>
                        <FormLabel>Celular</FormLabel>
                        <Input
                            type='tel'
                            placeholder='(00) 00000-0000'
                            {...register('phone', {
                                required: 'O número de celular é obrigatório',
                                pattern: {
                                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                                    message: 'Formato de celular inválido. Ex: (00) 00000-0000',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                    </FormControl> */}

                    {/* Senha */}
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            type='password'
                            placeholder='Insira uma senha'
                            {...register('password', {
                                required: 'A senha é obrigatória',
                                minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
                                },
                            })}
                        />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    {/* Confirmação de Senha */}
                    <FormControl isInvalid={!!errors.password_confirmation}>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <Input
                            type='password'
                            placeholder='Confirme sua senha'
                            {...register('password_confirmation', {
                                required: 'Confirmação de senha é obrigatória',
                                validate: (value) => value === password || 'As senhas não coincidem',
                            })}
                        />
                        <FormErrorMessage>{errors.password_confirmation?.message}</FormErrorMessage>
                    </FormControl>

                    {errorMessage && (
                        <Box color="red.500" fontSize="sm">
                            {errorMessage}
                        </Box>
                    )}

                    <Button
                        isDisabled={!isValid}
                        isLoading={isSubmitting}
                        type='submit'
                        bg={'primary.400'}
                        color={'white'}
                        _hover={{ bg: 'primary.500' }}>
                        Registrar
                    </Button>
                </Stack>
            </Box>
        </form>
    );
}
