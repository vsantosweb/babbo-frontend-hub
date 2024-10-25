import { PublicRepositoryInterface } from '@/interfaces';
import { EventDisplayType } from '@/types';
import { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { StoreEventInterface } from '../Interfaces/StoreEventInterface';
import ApiService from '../..';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class StoreEventService implements StoreEventInterface {

  protected api: AxiosInstance;

  /**
   * Cria uma nova instância do serviço de eventos do cliente.
   */
  constructor() {
    this.api = ApiService.configure('store');
  }

  async eventTickets(uuid: string): Promise<any> {
    try {
      const response = await this.api.get<any>(`/events/${uuid}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      throw error;
    }
  }

}