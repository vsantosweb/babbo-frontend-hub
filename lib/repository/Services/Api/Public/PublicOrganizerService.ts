import {
  PublicOrganizerRepositoryInterface,
} from '@/interfaces';
import { AxiosInstance } from 'axios';
import ApiService from '../service';
import { injectable } from 'inversify';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class PublicOrganizerService implements PublicOrganizerRepositoryInterface {
  protected api: AxiosInstance;

  /**
   * Cria uma nova instância do serviço de eventos do cliente.
   */

  constructor() {
    this.api = ApiService.configure('public');
  }

  /**
   * Retorna o perfil do organizador.
   * @returns {Promise<any>}.
   */
  async organizerProfile(id: number | string): Promise<any> {
    return await this.api.get<any>(`/organizers/${id}`);
  }

  /**
   * Retorna os eventos do organizador.
   * @param {number|string} id - O ID do organizador.
   * @returns {Promise<any>}
   */
  async organizerEvents(id?: number | string, params?: Record<string, string>): Promise<any> {
    try {
      const response = await this.api.get<any>(
        `/organizers/${id}/events?${new URLSearchParams(params)}`,
      );
      return response.data;
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  }

  /**
   * Retorna a vitrine de orgaizadores.
   * @returns {Promise<any>}.
   */
  async organizerShowcase(): Promise<any> {
    return await this.api.get<any>(`/organizers/showcase`);
  }
}
