import * as yup from 'yup';

export const customerValidatorSchema = {
    name: yup.string().required('Nome é obrigatório').max(255, 'Nome deve ter no máximo 255 caracteres'),
    email: yup.string().required('Email é obrigatório').email('Email é inválido').max(255, 'Email deve ter no máximo 255 caracteres'),
    phone: yup.string().required('Telefone é obrigatório').max(15, 'Telefone deve ter no máximo 15 caracteres'),
    photo_profile: yup.string().url('Foto de perfil deve ser uma URL válida').nullable().max(255, 'Foto de perfil deve ter no máximo 255 caracteres'),
    is_organizer: yup.boolean().required('Campo organizador é obrigatório'),
    organizer_name: yup.string().nullable().max(255, 'Nome do organizador deve ter no máximo 255 caracteres'),
    organizer_email: yup.string().nullable().email('Email do organizador é inválido').max(255, 'Email do organizador deve ter no máximo 255 caracteres'),
    organizer_instagram: yup.string().nullable().max(255, 'Instagram do organizador deve ter no máximo 255 caracteres')
}