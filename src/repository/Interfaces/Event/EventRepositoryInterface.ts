import { EventBanner, EventDisplayType, EventInterface } from "@/types";

/**
 * Interface que define métodos para recuperar informações sobre eventos do cliente.
 */
export interface EventRepositoryInterface {
    /**
     * Retorna uma lista de eventos com base nos parâmetros fornecidos.
     * @param {string} params - Parâmetros de filtro para a consulta de eventos.
     * @returns {Promise<EventInterface[]>} Uma promessa que resolve com uma lista de eventos.
     */
    events(params?: string): Promise<EventInterface[]>;

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
     * @returns {Promise<EventBanner[]>} Uma promessa que resolve com uma lista de banners de eventos.
     */
    banners(): Promise<EventBanner[]>;
}
