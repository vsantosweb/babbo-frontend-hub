import { useState, useEffect, createContext, useContext } from 'react';

// Cria uma instância do serviço de autenticação
import { AuthRepositoryInterface } from '@/interfaces';
import { ApiResponseType, CredentialsType, MiddlewareType, UserType } from '@/types';
import { RouteProps, getMiddlewareRoutes, managerRoutes } from '@/routes';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import container from '@/container';
import { LoginModal } from '@/components';


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
  setRequestModalLogin: (value: {redirect: string, active: boolean} | null) => void
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
  children: JSX.Element | JSX.Element[],
  middleware: MiddlewareType
  config?: AuthProviderConfigProps
}


/**
 * Provider que gerencia toda parte de autenticação do usuário.
 * @returns {Object} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
export function AuthProvider({ children, middleware, config }: AuthProviderProps) {

  const privatePaths = getMiddlewareRoutes(middleware).filter((nav: RouteProps) => nav.private).map(x => x.path);
  console.log(privatePaths, 'privatePaths')
  // ** States
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [rendering, setRendering] = useState<boolean>(true);
  const [checkingPermissions, setCheckingPermissions] = useState<boolean>(false);
  const [requestModalLogin, setRequestModalLogin] = useState<{redirect: string, active: boolean} | null>(null);

  const router = useRouter();

  const [authState, setAuthState] = useState<AuthStateInterface>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  // ** Repository
  const authService = container.get<AuthRepositoryInterface>(middleware);

  useEffect(() => {
    session(router.asPath)
  }, [router.pathname]);


  const session = async (url: string) => {

    return await authService.session().then((response) => {

      let user = response?.data?.data;

      if (user && router.pathname === config.loginRoute) config?.startPage && router.push(config.startPage)

      const isPrivatePath = privatePaths.some(path => window.location.pathname.startsWith(path));
      if (!user && isPrivatePath) {
        config && router.push(config.loginRoute);
        setAuthorized(false);
        setUser({})
        setRendering(false);

      } else {
        setAuthorized(true);
        console.log(user, 'useruseruseruseruser')
        setUser(user);

        if (middleware === 'auth:manager') {
          checkOrganizerPermission(user)
        }

      }
      setRendering(false);
    })
      .catch(() => {

        setAuthorized(false);
        config && router.push(config.loginRoute);
        setUser({});
        setRendering(false);
      })

  }

  const checkOrganizerPermission = async (user: Record<string, any>) => {

    setCheckingPermissions(true);

    // Verifica se a rota atual corresponde ao padrão '/events/**/**'
    const isEventRoute = router.pathname.startsWith('/events');

    if (isEventRoute && !user.is_organizer) {
      await router.push('/403').then(() => setCheckingPermissions(false))
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
      // Se a resposta for bem-sucedida e contiver dados do usuário, atualiza o estado do usuário

      if (response?.data?.success) {
        const expiresAt = new Date(response.data.data.expires_in * 1000);

        Cookies.set('token', response?.data.data.token, { expires: expiresAt })
        Cookies.set('token-exp', expiresAt.toString(), { expires: expiresAt });
        session(router.asPath)
        if (redirect) router.push(redirect)

        if(requestModalLogin.redirect) {
          router.push(requestModalLogin.redirect)
          setRequestModalLogin(null)
        }
        // router.push('/');
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
        window.location.href = config.loginRoute
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

  if (config) {

    if (rendering || (!authorized && window.location.pathname !== config.loginRoute)) return null
  }

  if (checkingPermissions) return null
  return (
    <AuthContext.Provider value={{ authState, loading, login, logout, socialLogin, user, setRequestModalLogin }}>
      {children}
      {requestModalLogin && <LoginModal setRequestLogin={setRequestModalLogin} open={requestModalLogin.active} />}
    </AuthContext.Provider>
  )
}