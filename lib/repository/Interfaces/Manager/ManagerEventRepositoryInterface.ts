import { EventRepositoryInterface } from '@/interfaces';
import { EventPayloadType } from '@/types';
/**
 * Interface que define métodos para recuperar informações sobre eventos do cliente.
 */
export interface MangerEventRepositoryInterface extends EventRepositoryInterface {

    /**
   * Cria um novo evento básico.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
    createEvent(payload: EventPayloadType): Promise<any>;

    /**
    * Atualiza um evento.
    * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
    */
    updateEvent(payload: EventPayloadType, eventId: number): Promise<any>;
    
    /**
    * Relatorio de impressoes por data.
    * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
    */
    impressionsByDate(eventId: number): Promise<any>;
}
