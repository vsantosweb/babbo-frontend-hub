import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import { addressValidatorSchema } from './addressValidator';
Yup.setLocale(pt);

export const eventValidatorSchema = {
    name: Yup.string().required('O nome do evento é obrigatório'),
    category: Yup.string().required('Campo obrigatório'),
    start_date: Yup.date()
        .required('Campo obrigatório')
        .typeError('Data de início é obrigatória')
        .test('is-valid-date', 'Data de início inválida', function (value) {
            if (!value) return true; // Aceita valores nulos ou vazios
            return new Date(value).toString() !== 'Invalid Date';
        }),
    end_date: Yup.date()
        .required('Campo obrigatório')
        .typeError('Data de término é obrigatória')
        .test('is-valid-date', 'Data de término inválida', function (value) {
            if (!value) return true; // Aceita valores nulos ou vazios
            return new Date(value).toString() !== 'Invalid Date';
        })
        .min(Yup.ref('start_date'), 'A data de término deve ser posterior à data de início'),
    event_image: Yup.string().required(),
    description: Yup.string().nullable(),
    has_external_ticket: Yup.boolean(),
    ticket_partner_url: Yup.string().nullable().when('has_external_ticket', (hasTickets, schema) => {
        return hasTickets[0] ? schema.required('A url do parceiro é obrigatória') : schema;

    }),
    ticket_partner_name: Yup.string().nullable().when('has_external_ticket', (hasTickets, schema) => {
        return hasTickets[0] ? schema.required('O nome do parceiro é obrigatório') : schema;

    }),
    image: Yup.mixed()
        .test('fileSize', 'A imagem deve ter no máximo 1MB', (value: any) => {
            if (!value) return true; // Retorna true se nenhum arquivo for fornecido
            // Verifica se o tamanho é menor ou igual a 1MB
            return value && value[0]?.size <= (1 * 1024 * 1024);
        })
        .test('fileType', 'A imagem deve ser do tipo JPG, JPEG, PNG ou GIF', (value: any) => {
            if (!value) return true; // Retorna true se nenhum arquivo for fornecido
            const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            return supportedFormats.includes(value[0]?.type);
        }),
    place: Yup.object().shape({ name: Yup.string().required('Campo obrigatório'), ...addressValidatorSchema })
}

export const eventValidator = Yup.object().shape(eventValidatorSchema);

export default eventValidator;
