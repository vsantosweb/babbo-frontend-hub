import { CustomerProfileRepositoryInterface } from '@/interfaces';
import { injectable } from 'inversify';
import CustomerApiService from './CustomerApiService';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class CustomerProfileApiService extends CustomerApiService implements CustomerProfileRepositoryInterface {

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */
    constructor() {
        super('customer');
    }

    /**
    * Relatorio de impressoes por data.
    * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
    */
    async me() {
        try {
            const response = await this.api.get<any>(`/profile/me`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }
    };

    /**
   * Atualiza os dados básico do usuário.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
    async updateBasicInfo(payload: Record<string, any>): Promise<any> {

        try {
            const response = await this.api.put('/profile/basic-info', payload);
            return response;
        } catch (error) {
            console.error('Request error:', error);
            return null;
        }
    }

    /**
   * Altera senha do usuário.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
    async changePassword(payload: Record<string, any>): Promise<any> {

        return await this.api.put('/profile/change-password', payload);
    }

}
