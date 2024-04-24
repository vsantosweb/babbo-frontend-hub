import * as Yup from 'yup';

export const passwordValidatorSchema = {
    current_password: Yup.string()
        .required('Senha atual é obrigatória'),
    password: Yup.string()
        .required('Nova senha é obrigatória')
        .min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
    password_confirmation: Yup.string()
        .test('passwords-match', 'A confirmação de senha precisa ser igual a nova senha', function (value) {
            return this.parent.password === value
        })
}

export const passwordValidator = Yup.object().shape(passwordValidatorSchema);

export default passwordValidator;
