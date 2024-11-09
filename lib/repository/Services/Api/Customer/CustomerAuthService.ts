import { AuthRepositoryInterface } from '@/repository/Interfaces';
import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import ApiService from '../service';
import { injectable } from 'inversify';
import { AuthServiceBase } from '../AuthServiceBase';

@injectable()
export class AuthServiceApiCustomer extends AuthServiceBase implements AuthRepositoryInterface {

  constructor() {
    super('customer');
  }

  /**
   * Realiza o login do usuário com as credenciais fornecidas.
   * @param {CredentialsType} credentials - As credenciais do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async login(credentials: CredentialsType): Promise<ApiResponseType | null> {
    try {
      // Lógica de autenticação
      const response = await this.api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      return null;
    }
  }

  /**
   * Realiza o logout do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async logout(): Promise<ApiResponseType | null> {
    try {
      // Lógica de logout
      const response = await this.api.post('/auth/logout');
      return response;
    } catch (error) {
      console.error('Erro ao realizar o logout:', error);
      return null;
    }
  }

  /**
   * Obtém a sessão atual do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async session(): Promise<ApiResponseType | null> {
    try {
      // Lógica para obter a sessão do usuário
      const response = await this.api.get('/auth/session');
      return response;
    } catch (error) {
      console.error('Erro ao obter a sessão:', error);
      return null;
    }
  }

  /**
   * Realiza o login do usuário usando autenticação social.
   * @param {CredentialsType} credentials - As credenciais do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async socialLogin(
    credentials: CredentialsType
  ): Promise<ApiResponseType | null> {
    try {
      // Lógica de login social
      const response = await this.api.post('/social-login', credentials);
      return response;
    } catch (error) {
      console.error('Erro ao realizar o login social:', error);
      return null;
    }
  }

  /**
   * Solicita a recuperação de senha para o email fornecido.
   * @param {string} email - O email do usuário.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async requestPasswordRecovery(
    email: string
  ): Promise<ApiResponseType | null> {
    try {
      // Lógica para solicitar a recuperação de senha
      const response = await this.api.post('/auth/password/recovery', email);
      return response;
    } catch (error) {
      console.error('Erro ao solicitar a recuperação de senha:', error);
      return null;
    }
  }

  /**
   * Valida o token de recuperação de senha.
   * @param {string} token - O token de recuperação de senha.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async validateRecoveryToken(token: string): Promise<ApiResponseType | null> {
    try {
      // Lógica para validar o token de recuperação de senha
      const response = await this.api.post('/auth/password/verify-recovery-token', token);
      return response;
    } catch (error) {
      console.error('Erro ao validar o token de recuperação de senha:', error);
      return null;
    }
  }

  /**
   * Reseta a senha do usuário com os dados fornecidos.
   * @param {ResetPasswordType} data - Os dados para redefinir a senha.
   * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
   */
  async resetPassword(
    data: ResetPasswordType
  ): Promise<ApiResponseType | null> {
    try {
      // Lógica para redefinir a senha do usuário
      const response = await this.api.post('/auth/password/reset', data);
      return response;
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      return null;
    }
  }
}
