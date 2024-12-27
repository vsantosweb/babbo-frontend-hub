import React, { useState, useEffect, createContext, useContext } from 'react';

// Cria uma instância do serviço de autenticação
import { AuthRepositoryInterface } from '@/interfaces';
import { ApiResponseType, CredentialsType, MiddlewareType, ResetPasswordType, UserType } from '@/types';
import { RouteProps, getMiddlewareRoutes, managerRoutes } from '@/routes';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import container from '@/container';
import { LoginModal } from '@/components';
import { eventCart } from '../useCart';
import { useApp } from '@/hooks'



// Define o tipo para o objeto do usuário
export interface UseAuthProps {
  login: (credentials: CredentialsType) => Promise<ApiResponseType | null>
  loading: boolean,
  logout: () => Promise<any | null>
}

//Define o tipo para o objecto AuthState
interface AuthStateInterface {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface AuthProviderInterface {
  login: (credentials: CredentialsType) => Promise<ApiResponseType | null>
  logout: () => Promise<ApiResponseType | null>
  loading?: boolean,
  authState?: any,
  socialLogin: (credentials: any) => void,
  user: Record<string, any> | null
  setRequestModalLogin: (value: { redirect: string, active: boolean } | null) => void
  requestPasswordRecovery: (email: string) => Promise<ApiResponseType>
  validateRecoveryToken: (token: string) => Promise<ApiResponseType>
  resetPassword: (data: ResetPasswordType) => Promise<ApiResponseType>
  registerCustomer: (data: Record<string, any>) => Promise<ApiResponseType | null>

}

const AuthContext = createContext<AuthProviderInterface | undefined>(undefined)

/**
 * Hook personalizado para gerenciar a autenticação do usuário.
 * @returns {AuthProviderInterface} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Retorna os estados e funções necessários para gerenciar a autenticação do usuário
  return context;
};

type AuthProviderConfigProps = {
  loginRoute?: string,
  startPage?: string
}

type AuthProviderProps = {
  children: React.ReactNode,
  middleware: MiddlewareType
  config?: AuthProviderConfigProps
}


/**
 * Provider que gerencia toda parte de autenticação do usuário.
 * @returns {Object} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
export function AuthProvider({ children, middleware, config }: AuthProviderProps) {

  const privatePaths = getMiddlewareRoutes(middleware).filter((nav: RouteProps) => nav.private).map(x => x.path);

  // ** States
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [rendering, setRendering] = useState<boolean>(true);
  const [checkingPermissions, setCheckingPermissions] = useState<boolean>(false);
  const [requestModalLogin, setRequestModalLogin] = useState<{ redirect: string, active: boolean } | null>(null);
  const { appName, redirectPath } = useApp();
  const isStoreApp = window.location.origin === process.env.NEXT_PUBLIC_STORE_URL;


  const router = useRouter();

  const [authState, setAuthState] = useState<AuthStateInterface>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  // ** Repository
  const authService = container.get<AuthRepositoryInterface>(middleware);

  useEffect(() => {
    session()
  }, [router.pathname]);


  const session = async () => {

    return await authService.session().then((response) => {

      let user = response?.data?.data;

      if (user && router.pathname === config?.loginRoute) config?.startPage && router.push(config.startPage)

      const isPrivatePath = privatePaths.some(path => window.location.pathname.startsWith(path));
      if (!user && isPrivatePath) {
        config?.loginRoute && router.push(config.loginRoute);
        setAuthorized(false);
        setUser({})
        setRendering(false);

      } else {
        setAuthorized(true);
        setUser(user);

        if (middleware === 'auth:manager') {
          checkOrganizerPermission(user)
        }

      }
      setRendering(false);
    })
      .catch(() => {

        setAuthorized(false);
        config?.loginRoute && router.push(config?.loginRoute);
        setUser({});
        setRendering(false);
      })

  }

  const checkOrganizerPermission = async (user: Record<string, any>) => {

    setCheckingPermissions(true);

    const isOrganizerApp = window.location.origin === process.env.NEXT_PUBLIC_ORGANIZER_URL;

    if (isOrganizerApp && !user.is_organizer) {
      await router.push('/setup').then(() => setCheckingPermissions(false))
    };

    await setCheckingPermissions(false);

  }

  /**
  * Função para realizar o login do usuário.
  * @param {CredentialsType} credentials - As credenciais do usuário.
  * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
  */
  const login = async (credentials: CredentialsType, redirect = null): Promise<ApiResponseType | null> => {
    try {
      // Chama a função de login do serviço de autenticação
      const response: ApiResponseType | null = await authService.login(credentials);
      // Se a resposta for bem-sucedida e conter dados do usuário, atualiza o estado do usuário

      if (response?.data?.success) {
        const expiresAt = new Date(response.data.data.expires_in * 1000);

        Cookies.set('token', response?.data.data.token, { expires: expiresAt })
        Cookies.set('token-exp', expiresAt.toString(), { expires: expiresAt });
        session();
        router.push(redirectPath)
        setRequestModalLogin(null)
        
        if(redirectPath.includes('payment')){
          eventCart.emit('userLoggedIn')
        }
      }

      // Retorna a resposta da função de login
      return response?.data;
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      return null;
    }
  };

  /**
   * Função para realizar o logout do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  const logout = async (): Promise<ApiResponseType | null> => {
    try {
      // Chama a função de logout do serviço de autenticação
      await authService.logout().then(response => {

        if (isStoreApp) {
          router.push(router.asPath)
        }
        if (config?.loginRoute) {
          window.location.href = config?.loginRoute
          return;
        }

      });
      // Limpa o estado do usuário

      return null;
    } catch (error) {
      console.error('Erro ao realizar o logout:', error);
      return null;
    }
  };

  /**
   * Função para realizar login do usuário com SSO .
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async function socialLogin(credentials: any) {

    console.log('social login...')
    // let signData = {
    //   email: credentials.email,
    //   auth_provider: credentials.auth_provider,
    //   provider_id: credentials.provider_id,
    //   name: credentials.name,
    //   avatar: credentials.avatar
    // }

    // const { data } = await api.post('/customer/auth/social-login', signData)
    //   .then(response => response.data)
    //   .catch(error => error.response);

    // if (data.error) return data
    // Cookie.set('token', data);
    // return data;

  }


  const requestPasswordRecovery = (email: string) => {
    return authService.requestPasswordRecovery(email).then(response => {
      return response?.data
    })
  }

  const validateRecoveryToken = (token: string) => {
    return authService.validateRecoveryToken(token).then(response => {
      return response?.data
    })
  }

  const resetPassword = (data: ResetPasswordType) => {

    data.token = sessionStorage.getItem('reset-token');

    return authService.resetPassword(data).then(response => {
      return response?.data
    })
  }

  const registerCustomer = (data: Record<string, any>) => {

    return authService.register(data).then(response => {
      if (response?.data.success) {

        const expiresAt = new Date(response.data.data.expires_in * 1000)
        Cookies.set('token', response?.data.data.token, { expires: expiresAt })
        Cookies.set('token-exp', expiresAt.toString(), { expires: expiresAt })
        session()
        router.push(redirectPath)

        if(redirectPath.includes('payment')){
          eventCart.emit('userLoggedIn')
        }

        setRequestModalLogin(null)
      }
      return response
    })
  }


  if (config) {

    if (rendering || (!authorized && window.location.pathname !== config.loginRoute)) return null
  }

  if (checkingPermissions) return null
  return (
    <AuthContext.Provider value={{
      authState,
      loading,
      login,
      logout,
      socialLogin,
      user,
      setRequestModalLogin,
      requestPasswordRecovery,
      validateRecoveryToken,
      resetPassword,
      registerCustomer
    }}>
      {children}
      {requestModalLogin && <LoginModal setRequestLogin={setRequestModalLogin} open={requestModalLogin.active} />}
    </AuthContext.Provider>
  )
}