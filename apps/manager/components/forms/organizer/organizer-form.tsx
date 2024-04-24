import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

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
}

// Schema de validação com Yup
const schema = yup.object().shape({
    organizer_name: yup.string().required('O nome do organizador é obrigatório'),
    organizer_email: yup.string().email('Email inválido').required('O email é obrigatório'),
    organizer_phone: yup.string().required('O telefone é obrigatório'),
    organizer_avatar: yup.string(),
    organizer_facebook: yup.string().url('URL inválida'),
    organizer_instagram: yup.string().url('URL inválida'),
    organizer_twitter: yup.string().url('URL inválida'),
    organizer_youtube: yup.string().url('URL inválida'),
    organizer_whatsapp: yup.string().url('URL inválida'),
});

const OrganizerForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        // Aqui você pode fazer o que quiser com os dados submetidos
    };

    return (
        <Box  mt={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.organizer_name}>
                    <FormLabel>Nome do Organizador</FormLabel>
                    <Input type="text" {...register("organizer_name")} placeholder="Nome do Organizador" />
                    <FormErrorMessage>{errors.organizer_name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_email}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" {...register("organizer_email")} placeholder="Email" />
                    <FormErrorMessage>{errors.organizer_email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_phone}>
                    <FormLabel>Telefone</FormLabel>
                    <Input type="tel" {...register("organizer_phone")} placeholder="Telefone" />
                    <FormErrorMessage>{errors.organizer_phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_facebook}>
                    <FormLabel>Facebook (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_facebook")} placeholder="URL do Facebook" />
                    <FormErrorMessage>{errors.organizer_facebook?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_instagram}>
                    <FormLabel>Instagram (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_instagram")} placeholder="URL do Instagram" />
                    <FormErrorMessage>{errors.organizer_instagram?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_twitter}>
                    <FormLabel>Twitter (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_twitter")} placeholder="URL do Twitter" />
                    <FormErrorMessage>{errors.organizer_twitter?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_youtube}>
                    <FormLabel>YouTube (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_youtube")} placeholder="URL do YouTube" />
                    <FormErrorMessage>{errors.organizer_youtube?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.organizer_whatsapp}>
                    <FormLabel>WhatsApp (opcional)</FormLabel>
                    <Input type="text" {...register("organizer_whatsapp")} placeholder="URL do WhatsApp" />
                    <FormErrorMessage>{errors.organizer_whatsapp?.message}</FormErrorMessage>
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                    Enviar
                </Button>
            </form>
        </Box>
    );
};

export default OrganizerForm;
