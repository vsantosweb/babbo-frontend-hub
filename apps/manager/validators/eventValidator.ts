import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import { addressValidatorSchema } from './addressValidator';
Yup.setLocale(pt);

export const eventValidatorSchema = {
    name: Yup.string().required('O nome do evento é obrigatório'),
    categories: Yup.array().min(1, 'Selecione pelo menos uma categoria').required('Campo obrigatório'),
    start_date: Yup.date()
        .nullable()
        .typeError('Data de início é obrigatória')
        .test('is-valid-date', 'Data de início inválida', function (value) {
            if (!value) return true; // Aceita valores nulos ou vazios
            return new Date(value).toString() !== 'Invalid Date';
        }),
    end_date: Yup.date()
        .nullable()
        .typeError('Data de término é obrigatória')
        .test('is-valid-date', 'Data de término inválida', function (value) {
            if (!value) return true; // Aceita valores nulos ou vazios
            return new Date(value).toString() !== 'Invalid Date';
        })
        .min(Yup.ref('start_date'), 'A data de término deve ser posterior à data de início'),
    event_image: Yup.string().required(),
    description: Yup.string(),
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
    place: Yup.object().shape({ name: Yup.string().required(), ...addressValidatorSchema })
}

const eventValidator = Yup.object().shape(eventValidatorSchema);

export default eventValidator;
