import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
Yup.setLocale(pt);

export const basicProfileValidatorSchema = {
    name: Yup.string().required('Campo obrigatório'),
    phone: Yup.string().required('Campo obrigatório'),
    email: Yup.string(),
    photo_profile: Yup.string()
}

export const basicProfileValidator = Yup.object().shape(basicProfileValidatorSchema);

export default basicProfileValidator;
