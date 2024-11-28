import { CustomerAuthRepositoryInterface } from '@/repository/Interfaces';
import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import ApiService from '../service';
import { injectable } from 'inversify';
import { AuthServiceBase } from '../AuthServiceBase';

@injectable()
export class AuthServiceApiCustomer extends AuthServiceBase implements CustomerAuthRepositoryInterface {

  constructor() {
    super('customer');
  }

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


  async socialLogin(credentials: CredentialsType): Promise<ApiResponseType | null> {
    try {
      // Lógica de login social
      const response = await this.api.post('/social-login', credentials);
      return response;
    } catch (error) {
      console.error('Erro ao realizar o login social:', error);
      return null;
    }
  }

 
  async requestPasswordRecovery(
    email: string
  ): Promise<ApiResponseType | any> {
    try {
      // Lógica para solicitar a recuperação de senha
      const response = await this.api.post('/auth/password/recovery', { email: email });
      return response;
    } catch (error) {
      console.error('Erro ao solicitar a recuperação de senha:', error);
      return error;
    }
  }

 
  async validateRecoveryToken(token: string): Promise<ApiResponseType | null> {
    try {
      // Lógica para validar o token de recuperação de senha
      const response = await this.api.post('/auth/password/verify-recovery-token', { token: token });
      return response;
    } catch (error) {
      console.error('Erro ao validar o token de recuperação de senha:', error);
      return null;
    }
  }

  async resetPassword(data: ResetPasswordType): Promise<ApiResponseType | null> {
    try {
      const response = await this.api.post('/auth/password/reset', data);
      return response;
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      return null;
    }
  }

  async register(data: Record<string, any>): Promise<ApiResponseType | null> {
    try {
      const response = await this.api.post('/auth/register', data);
      return response;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return null;
    }
  }
}
