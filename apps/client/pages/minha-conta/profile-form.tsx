import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '@/hooks';

// Definindo os tipos dos dados do formulário e do usuário
type ProfileFormData = {
    name: string;
    email: string;
    phone: string;
    document: string;
};

type ProfileFormProps = {
    user: ProfileFormData; // Os dados do usuário vêm das props
};

function ProfileForm() {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProfileFormData>();

    const { user } = useAuth();

    // Carrega os dados do usuário ao montar o componente
    useEffect(() => {
        console.log(user, 'user')
        if (user) {
            setValue('name', user.name, { shouldValidate: true });
            setValue('email', user.email, { shouldValidate: true });
            setValue('phone', user.phone, { shouldValidate: true });
            setValue('document', user.document, { shouldValidate: true });
        }
    }, [user, setValue]);

    // Manipulador de envio do formulário
    const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
        console.log('Dados do perfil:', data);
        // Aqui você pode enviar os dados para uma API ou processá-los conforme necessário
    };

    return (
        <Box  mx='auto' mt={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel>Nome completo</FormLabel>
                        <Input
                            type='text'
                            placeholder='Digite seu name'
                            {...register('name', { required: 'name é obrigatório' })}
                        />
                        {errors.name && <Text color='red.500'>{errors.name.message}</Text>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            placeholder='Digite seu email'
                            {...register('email', {
                                required: 'Email é obrigatório',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Endereço de email inválido',
                                },
                            })}
                        />
                        {errors.email && <Text color='red.500'>{errors.email.message}</Text>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.phone}>
                        <FormLabel>Telefone</FormLabel>
                        <Input
                            type='tel'
                            placeholder='Digite seu telefone'
                            {...register('phone', {
                                required: 'Telefone é obrigatório',
                                pattern: {
                                    value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                                    message: 'Número de telefone inválido',
                                },
                            })}
                        />
                        {errors.phone && <Text color='red.500'>{errors.phone.message}</Text>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.document}>
                        <FormLabel>CPF</FormLabel>
                        <Input
                            type='text'
                            placeholder='Digite seu CPF'
                            {...register('document', {
                                required: 'CPF é obrigatório',
                                pattern: {
                                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                    message: 'CPF inválido',
                                },
                            })}
                        />
                        {errors.document && <Text color='red.500'>{errors.document.message}</Text>}
                    </FormControl>

                    <Button
                        type='submit'
                        alignSelf={'end'}
                        colorScheme='blue'
                        isLoading={isSubmitting}
                    >
                        Salvar Alterações
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

export default ProfileForm;
