import { EventRepositoryInterface } from "@/interfaces";
import { EventBanner, EventDisplayType, EventInterface } from "@/types";
import { AxiosInstance } from 'axios';
import ApiService from "..";
import { injectable } from "inversify";

/**
 * Serviço responsável por recuperar informações sobre eventos do cliente.
 */
@injectable()
export class PublicEventService implements EventRepositoryInterface {
    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */

    constructor() {
        this.api = ApiService.configure('public');
    }

    /**
     * Retorna uma lista de eventos com base nos parâmetros fornecidos.
     * @param {string} params - Parâmetros de filtro para a consulta de eventos.
     * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
     */
    async events(params?: string): Promise<EventInterface[]> {
        try {
            const response = await this.api.get(`/events?${params}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna os detalhes de um evento com base no ID fornecido.
     * @param {number|string} id - O ID do evento.
     * @returns {Promise<EventInterface>} Uma promessa que resolve com os detalhes do evento.
     */
    async event(id: number | string): Promise<EventInterface> {
        try {
            const response = await this.api.get<EventInterface>(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter detalhes do evento:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de eventos relacionados ao evento com o ID fornecido.
     * @param {number|string} id - O ID do evento.
     */
    async related(id: number | string): Promise<any> {
        try {
            const response = await this.api.get<EventInterface>(`/events/${id}/related`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter eventos relacionados:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de categorias de eventos disponíveis.
     * @returns {Promise<EventDisplayType[]>} Uma promessa que resolve com uma lista de categorias de eventos.
     */
    async displayTypes(): Promise<EventDisplayType[]> {
        try {
            const response = await this.api.get<EventDisplayType[]>(`/event-categories`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter categorias de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de banners de eventos para exibição.
     * @returns {Promise<EventBanner[]>} Uma promessa que resolve com uma lista de banners de eventos.
     */
    async banners(): Promise<EventBanner[]> {
        try {
            const response = await this.api.get<EventBanner[]>(`/event-banners`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }
}
