import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);

export const cardValidatorSchema = {
    number: Yup.string()
        .matches(/^\d{16}$/, 'O número do cartão deve ter 16 dígitos')
        .required('Campo obrigatório'),
    holder_name: Yup.string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .required('Campo obrigatório'),
    exp_month: Yup.number()
        .min(1, 'O mês deve ser entre 1 e 12')
        .max(12, 'O mês deve ser entre 1 e 12')
        .required('Campo obrigatório'),
    exp_year: Yup.number()
        .min(new Date().getFullYear() % 100, 'O ano deve ser válido')
        .required('Campo obrigatório'),
    cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'O CVV deve ter 3 ou 4 dígitos')
        .required('Campo obrigatório'),
};

export const cardValidator = Yup.object().shape(cardValidatorSchema);

export default cardValidator;
