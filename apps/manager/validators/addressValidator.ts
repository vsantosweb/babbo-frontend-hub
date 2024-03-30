import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

export const addressValidatorSchema = {
    full_address: Yup.string().required('Campo obrigatório'),
    address_1: Yup.string().required('Campo obrigatório'),
    address_2: Yup.string().required('Campo obrigatório'),
    zipcode: Yup.string().required('Campo obrigatório'),
    city: Yup.string().required('Campo obrigatório'),
    state: Yup.string().required('Campo obrigatório'),
    address_number: Yup.string().required('Campo obrigatório'),
}


export const addressValidator = Yup.object().shape(addressValidatorSchema);

export default addressValidator;
