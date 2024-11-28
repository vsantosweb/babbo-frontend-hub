import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';

/**
 * Interface que define os métodos para interagir com a autenticação.
 * @interface AuthRepositoryInterface
 */
export interface AuthRepositoryInterface {
  /**
   * Realiza o login do usuário com as credenciais fornecidas.
   * @param {CredentialsType} credentials - As credenciais do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  login(credentials: CredentialsType): Promise<ApiResponseType | null>;

  /**
   * Realiza o logout do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  logout(): Promise<ApiResponseType | null>;

  /**
   * Obtém a sessão atual do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  session(): Promise<ApiResponseType | null>;

  requestPasswordRecovery(email: string): Promise<ApiResponseType | null>

  validateRecoveryToken(token: string): Promise<ApiResponseType | null>

  resetPassword(data: ResetPasswordType): Promise<ApiResponseType | null>

  register(data: Record<string, any>): Promise<ApiResponseType | null>;
  

}
