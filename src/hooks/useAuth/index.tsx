import { useState, useEffect, createContext, useContext } from 'react';

// Cria uma instância do serviço de autenticação
import { AuthRepositoryInterface } from '@/interfaces';
import { ApiResponseType, CredentialsType, UserType } from '@/types';
import { RouteProps, managerRoutes } from '@/routes';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import container from '@/container';

const privatePaths = managerRoutes.filter((nav: RouteProps) => nav.private).map(x => x.path);

// Define o tipo para o objeto do usuário
export interface UseAuthProps {
  login: (credentials: CredentialsType) => Promise<ApiResponseType | null>
  loading: boolean,
  logout: () => Promise<any | null>
}

//Define o tipo para o objecto AuthState
interface AuthState {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface AuthProviderInterface {
  login: (credentials: CredentialsType) => Promise<ApiResponseType | null>
  logout: () => Promise<ApiResponseType | null>
  loading?: boolean,
  authState?: any,
  socialLogin: (credentials: any) => void
}

const AuthContext = createContext<AuthProviderInterface | undefined>(undefined)

/**
 * Hook personalizado para gerenciar a autenticação do usuário.
 * @returns {AuthProviderInterface} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AccessibilityProvider');
  }

  // Retorna os estados e funções necessários para gerenciar a autenticação do usuário
  return context;
};


/**
 * Provider que gerencia toda parte de autenticação do usuário.
 * @returns {Object} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
export function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<any>(false);
  const [rendering, setRendering] = useState<boolean>(true);
  const router = useRouter();

  const authService = container.get<AuthRepositoryInterface>('auth-manager');

  useEffect(() => {
    // on initial load - run auth check 
    session(router.asPath)

    // // on route change start - hide page content by setting authorized to false  
    // const hideContent = () => setRendering(true)

    // // // on route change complete - run auth check 
    // router.events.on('routeChangeComplete', authCheck)

    // // // unsubscribe from events in useEffect return function
    return () => {
      // router.events.off('routeChangeStart', hideContent);
      // router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);


  const session = async (url: string) => {


    return await authService.session().then((response) => {

      let user = response?.data?.data;

      if (user && router.pathname === '/account/login') router.push(`/`)

      if (!user && privatePaths.includes(window.location.pathname)) {
        router.push('/account/login');
        setAuthorized(false);
        setUser({})

      } else { setAuthorized(true); setUser(user.data) }

      setRendering(false)

    }).catch(() => {

      setAuthorized(false);
      router.push('/account/login');
      setUser({});
      setRendering(false);
    })

  }

  /**
  * Função para realizar o login do usuário.
  * @param {CredentialsType} credentials - As credenciais do usuário.
  * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
  */
  const login = async (credentials: CredentialsType): Promise<ApiResponseType | null> => {
    try {
      // Chama a função de login do serviço de autenticação
      const response: ApiResponseType | null = await authService.login(credentials);
      // Se a resposta for bem-sucedida e contiver dados do usuário, atualiza o estado do usuário
      if (response && response.data) {

        const expiresAt = new Date(response.data.data.expires_in * 1000);

        Cookies.set('token', response?.data.data.token, { expires: expiresAt })
        Cookies.set('token-exp', expiresAt.toString(), { expires: expiresAt });

        router.push('/');

        setUser(response?.data.user);

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
      await authService.logout();
      // Limpa o estado do usuário
      setUser(null);
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

  if (rendering || (!authorized && window.location.pathname !== '/account/login')) return null


  return (
    <AuthContext.Provider value={{ authState, loading, login, logout, socialLogin }}>
      {children}
    </AuthContext.Provider>
  )
}