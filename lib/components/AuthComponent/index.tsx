import React, { createContext, useState } from 'react'
import PasswordRecoveryForm from './password-recovery-form'
import PasswordTokenForm from './passcord-token-form'
import PasswordResetForm from './password-reset-form'
import LoginForm from './login-form'
import PasswordRecoveryResult from './password-recovery-result'
import RegisterForm from './register-form'


export type AuthFormType = 'recovery-form' | 'token-form' | 'reset-form' | 'login-form' | 'reset-result' | 'register-form'

export interface AuthFormContextInterface {
  setActiveForm: (value: AuthFormType) => void
  activeForm: AuthFormType
}

export const AuthFormContext = createContext<AuthFormContextInterface | undefined>(undefined);

const AuthForm = {
  'login-form': LoginForm,
  'register-form': RegisterForm,
  'recovery-form': PasswordRecoveryForm,
  'token-form': PasswordTokenForm,
  'reset-form': PasswordResetForm,
  'reset-result': PasswordRecoveryResult,
}

export function AuthComponent() {

  const [activeForm, setActiveForm] = useState<AuthFormType>(sessionStorage.getItem('reset-token') ? 'reset-form' : 'login-form');
  
  const Form = AuthForm[activeForm]

  return (
    <AuthFormContext.Provider value={{ setActiveForm, activeForm }}>
      <Form />
    </AuthFormContext.Provider>
  )
}
