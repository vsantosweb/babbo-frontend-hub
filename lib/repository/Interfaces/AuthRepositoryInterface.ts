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

  /**
   * Realiza o login do usuário usando autenticação social.
   * @param {CredentialsType} credentials - As credenciais do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  socialLogin?(credentials: CredentialsType): Promise<ApiResponseType | null>;

  /**
   * Solicita a recuperação de senha para o email fornecido.
   * @param {string} email - O email do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  requestPasswordRecovery?(email: string): Promise<ApiResponseType | null>;

  /**
   * Valida o token de recuperação de senha.
   * @param {string} token - O token de recuperação de senha.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  validateRecoveryToken?(token: string): Promise<ApiResponseType | null>;

  /**
   * Reseta a senha do usuário com os dados fornecidos.
   * @param {ResetPasswordType} data - Os dados para redefinir a senha.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  resetPassword?(data: ResetPasswordType): Promise<ApiResponseType | null>;
}
