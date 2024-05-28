import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from ".";
import { injectable, unmanaged } from "inversify";
import { ApiResponseType, CredentialsType } from "@/types";
@injectable()
export class AuthServiceBase {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de autenticação.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
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
}