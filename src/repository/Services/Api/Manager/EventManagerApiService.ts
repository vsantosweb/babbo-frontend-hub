import { EventRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { EventBanner, EventDisplayType, EventInterface, EventPayloadType } from '@/types';
import { AxiosInstance } from 'axios';
import ApiService from '..';
import { inject, injectable } from 'inversify';
import { EventApiService } from '../EventApiService';

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class EventManagerApiService extends EventApiService implements EventRepositoryInterface {

  /**
   * Cria uma nova instância do serviço de eventos do cliente.
   */

  constructor() {
    super('manager');
  }

}
