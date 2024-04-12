import { EventRepositoryInterface, MangerEventRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { EventBanner, EventDisplayType, EventInterface, EventPayloadType } from '@/types';
import { AxiosInstance } from 'axios';
import ApiService from '..';
import { inject, injectable } from 'inversify';
import { EventApiService } from '../EventApiService';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class EventManagerApiService extends EventApiService implements MangerEventRepositoryInterface {

  /**
   * Cria uma nova instância do serviço de eventos do cliente.
   */
  constructor() {
    super('manager');
  }

  /**
  * Relatorio de impressoes por data.
  * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
  */
  async impressionsByDate(eventId: number) {
    try {
      const response = await this.api.get<any>(`/events/${eventId}/reports/impressions-by-date`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter eventos:', error);
      throw error;
    }
  };

  /**
  * Relatorio de impressoes por data.
  * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
  */
  async deleteEvent(eventId: number) {
    try {
      const response = await this.api.delete<any>(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar eventos:', error);
      throw error;
    }
  };

}
