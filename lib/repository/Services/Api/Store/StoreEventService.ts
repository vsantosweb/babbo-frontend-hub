import { EventDisplayType } from '@/types';
import { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { StoreRepositoryInterface } from '@/interfaces';
import ApiService from '../service';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class StoreEventService implements StoreRepositoryInterface {

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