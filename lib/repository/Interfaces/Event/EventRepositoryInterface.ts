import { EventBanner, EventDisplayType, EventInterface, EventPayloadType } from '@/types';

/**
 * Interface que define métodos para recuperar informações sobre eventos do cliente.
 */
export interface EventRepositoryInterface {

  /**
   * Retorna uma lista de eventos com base nos parâmetros fornecidos.
   * @param {string} params - Parâmetros de filtro para a consulta de eventos.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
  events(params?: Record<string, string | number>): Promise<any>;

  /**
   * Retorna os detalhes de um evento com base no ID fornecido.
   * @param {number|string} id - O ID do evento.
   * @returns {Promise<EventInterface>} Uma promessa que resolve com os detalhes do evento.
   */
  event(id: number | string): Promise<any>;

  /**
   * Retorna uma lista de eventos relacionados ao evento com o ID fornecido.
   * @param {number|string} id - O ID do evento.
   * @returns {Promise<EventInterface[]>} Uma promessa que resolve com uma lista de eventos relacionados.
   */
  related(id: number | string): Promise<any>;

  /**
   * Retorna uma lista de categorias de eventos disponíveis.
   * @returns {Promise<EventDisplayType[]>} Uma promessa que resolve com uma lista de categorias de eventos.
   */
  displayTypes(): Promise<EventDisplayType[]>;

  /**
   * Retorna uma lista de banners de eventos para exibição.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de banners de eventos.
   */
  banners(): Promise<any>;

  /**
   * Retorna uma lista de eventos baseado no nome.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
  search(name: string): Promise<any>;

  /**
   * Retorna uma lista de categorias/tipos de eventos.
   * @returns {Promise<any>}
   */
  categories(): Promise<any>;

  /**
   * Retorna uma lista de cidades com eventos disponíveis
   * @returns {Promise<any>}
   */
  avaiableCities(): Promise<any>;

}
