import { useState, useEffect } from 'react';

// Cria uma instância do serviço de autenticação
import container from '../../repository/providers/container';
import { AuthRepositoryInterface } from '@/interfaces';
import { ApiResponseType, CredentialsType, UserType } from '@/types';

/**
 * Hook personalizado para gerenciar a autenticação do usuário.
 * @returns {Object} Um objeto contendo informações e funções relacionadas à autenticação do usuário.
 */
const useAuth = (serivce:string): UseAuthProps => {

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  // Estado para armazenar as informações do usuário autenticado
  const [user, setUser] = useState<UserType | null>(null);
  // Estado para controlar o carregamento das informações de autenticação
  const [loading, setLoading] = useState<boolean>(true);

  const authService = container.get<AuthRepositoryInterface>(serivce);

  /**
   * Efeito colateral para buscar a sessão do usuário quando o componente é montado.
   */
  useEffect(() => {
    const getSession = async () => {
      try {
        // Chama a função para obter a sessão do usuário do serviço de autenticação
        const response: ApiResponseType | null = await authService.session();
        // Se a resposta for bem-sucedida e contiver dados do usuário, atualiza o estado do usuário
        if (response && response.data) {
          setAuthState({
            user: response.data.user,
            loading: false,
            isAuthenticated: true,
          });
        }
        // Indica que o carregamento foi concluído
        setLoading(false);
      } catch (error) {

        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
        });

        console.error('Erro ao buscar a sessão do usuário:', error);
        setLoading(false);
      }
    };

    // Chama a função para buscar a sessão do usuário
    getSession();

    // Função de limpeza que será executada quando o componente for desmontado
    return () => {
      // Limpa o estado do usuário e indica que o carregamento está ocorrendo
      setAuthState({
        user: null,
        loading: true,
        isAuthenticated: false,
      });
      
    };
  }, [authState]);

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
        setUser(response.data.user);
      }
      // Retorna a resposta da função de login
      return response;
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

  // Outras funções de autenticação...

  // Retorna os estados e funções necessários para gerenciar a autenticação do usuário
  return {
    ...authState,
    loading,
    login,
    logout,
    // Outras funções de autenticação...
  };
};

// Define o tipo para o objeto do usuário
export interface UseAuthProps {
  login:  (credentials: CredentialsType) => Promise<ApiResponseType | null>
  loading: boolean,
  logout:() => Promise<any | null>
}

//Define o tipo para o objecto AuthState
interface AuthState {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Exporta o hook personalizado para uso em outros componentes
export default useAuth;
