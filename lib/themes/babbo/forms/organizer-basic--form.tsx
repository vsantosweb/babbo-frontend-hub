import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Box, Text, Stack, Heading, Flex, Textarea, Checkbox, useDisclosure, UseDisclosureProps, useToast } from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import container from '@/container';
import { CustomerRegisterRepositoryInterface } from '@/interfaces';
import { useRouter } from 'next/router';

const customerRegisterService = container.get<CustomerRegisterRepositoryInterface>('customer-register');
// Definição das tipagens dos dados do formulário
interface FormValues {
    organizer_name: string;
    organizer_email: string;
    organizer_phone: string;
    organizer_avatar?: string;
    organizer_facebook?: string;
    organizer_instagram?: string;
    organizer_twitter?: string;
    organizer_youtube?: string;
    organizer_whatsapp?: string;
    organizer_description?: string;
}

// Schema de validação com Yup
const schema = yup.object().shape({
    organizer_name: yup.string().required('O nome do organizador é obrigatório'),
    organizer_email: yup.string().email('Email inválido').required('O email é obrigatório'),
    organizer_phone: yup.string().required('O telefone é obrigatório'),
    organizer_description: yup.string(),
    organizer_facebook: yup.string().url('URL inválida'),
    organizer_instagram: yup.string().url('URL inválida'),
    organizer_twitter: yup.string().url('URL inválida'),
    organizer_youtube: yup.string().url('URL inválida'),
    organizer_whatsapp: yup.string().url('URL inválida'),
});

export const OrganizerBasicForm = ({ disclosure }: { disclosure?: UseDisclosureProps }) => {

    const router = useRouter();

    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormValues>  = async (data) => {

        await customerRegisterService.basicOrganizerRegister(data).then(response => {
            toast({
                status: 'success',
                title: 'Perfil configurado',
                description: 'Seu perfil de organizador foi configurado'
            });

            disclosure?.onClose && disclosure.onClose();
            router.push('/events/create');

        }).catch(() => {
            toast({
                status: 'error',
                title: 'Ocorreu um erro no servidor',
                description: 'Nossa equipe está verificando o problema'
            });
        })
    };

    return (
        <Stack spacing={4}>
            <Heading size={'lg'}>Configurar perfil de organizador</Heading>
            <Text>
                Vamos configurar sua página de organizador. Para prosseguir,
                é necessário ativar seu perfil de organizador.
                Preencha as informações básicas para começar a criar seus eventos.
            </Text>
            <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired isInvalid={!!errors.organizer_name}>
                    <FormLabel>Nome do organizador</FormLabel>
                    <Input type="text" {...register("organizer_name")} placeholder="Nome do organizador ou produtora de eventos" />
                    <FormErrorMessage>{errors.organizer_name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.organizer_email}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...register("organizer_email")} placeholder="Email" />
                    <FormErrorMessage>{errors.organizer_email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.organizer_phone}>
                    <FormLabel>Telefone</FormLabel>
                    <Input type="tel" {...register("organizer_phone")} placeholder="(99) 99999 9999" />
                    <FormErrorMessage>{errors.organizer_phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.organizer_instagram}>
                    <FormLabel>Perfil do Instagram (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_instagram")} placeholder="https://instagram.com" />
                    <FormErrorMessage>{errors.organizer_instagram?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.organizer_instagram}>
                    <FormLabel>Sobre (Opcional)</FormLabel>
                    <Textarea height={'120px'} maxHeight={'150px'} maxLength={500} {...register('organizer_description')} />
                    <FormErrorMessage>{errors.organizer_instagram?.message}</FormErrorMessage>
                </FormControl>

                <Flex gap={2} justifyContent={'flex-end'}>
                    <Button mt={4} variant={'outline'} onClick={disclosure?.onClose}>Cancelar</Button>
                    <Button mt={4} isLoading={isSubmitting} type="submit">Salvar e continuar</Button>
                </Flex>

            </Stack>
        </Stack>
    );
};

