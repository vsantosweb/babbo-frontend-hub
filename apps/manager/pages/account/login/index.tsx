import React from "react";
import type { NextPage } from "next";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
// import GoogleLogin from "react-google-login";
import { useRouter } from "next/router";
import * as Styled from '../styles';
import Link from "next/link";
import { CredentialsType } from "@/types";
import { useAuth, AuthProviderInterface } from "@/hooks";
import Layout from '@/layouts';
import { FaArrowRightLong } from "react-icons/fa6";

const Login: NextPage = ({ layout }: any) => {

  const { handleSubmit, register, formState: { isValid, errors } } = useForm({ mode: 'onChange' });

  const { login, socialLogin } = useAuth();

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [buttonState, setButonState] = React.useState<any>({ disabled: !isValid, isLoading: false })
  const route = useRouter();


  React.useEffect(() => setButonState({ disabled: !isValid }), [isValid])

  const submitCredentials = (credentials: CredentialsType) => {

    setButonState({ disabled: true, isLoading: true });

    login(credentials).then((response: any) => {

      console.log(response, 'response')
      if (!response.success) {
        setButonState({ disabled: false, isLoading: false });
        return setErrorMessage(response.message)
      }
      // _watch();

    })

  }

  return (
    <Layout name={'auth'}>
      <form onSubmit={handleSubmit(submitCredentials)}>
        <Stack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder={'Edereço de email'} autoComplete={'off'} {...register('email', { required: true })} />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input placeholder='••••••••••' type={'password'} {...register('password', { required: true })} />
          </FormControl>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={'/account/recovery'}>Esqueci minha senha</Link>
          </div>

          <Styled.AccountButton type={'submit'}
            colorScheme={'primary'} {...buttonState} isDisabled={!isValid} rightIcon={<FaArrowRightLong />}>Entrar</Styled.AccountButton>
          <p style={{ color: 'red' }}>{errorMessage}</p>

          <p>Não tem uma conta na Babbo?</p>
          <Styled.AccountButton
            style={{ width: '100%' }}
            variant={'outline'}
            onClick={() => route.push('/account/register')}
            rightIcon={<FaArrowRightLong />}>Registre-se</Styled.AccountButton>
        </Stack>
      </form>
    </Layout>
  );
};

export default Login;
