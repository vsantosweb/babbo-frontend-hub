import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);

export const cardValidatorSchema = {
    number: Yup.string().required('Campo obrigatório').matches(/^\d{16}$/, 'O número do cartão deve ter 16 dígitos'),
    holder_name: Yup.string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .required('Campo obrigatório'),
    installments: Yup.string()
        .required('Campo obrigatório'),
    exp_date: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato inválido (MM/AA)')
        .test('valid-date', 'Data de vencimento inválida', function (value) {
            if (!value) return false;
            const [month, year] = value.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            return (
                (year > currentYear) ||
                (year === currentYear && month >= currentMonth)
            );
        })
        .required('Campo obrigatório'),
    cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'O CVV deve ter 3 dígitos')
        .required('Campo obrigatório'),
};

export const cardValidator = Yup.object().shape(cardValidatorSchema);

export default cardValidator;
