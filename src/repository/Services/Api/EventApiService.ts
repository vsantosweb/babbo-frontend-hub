import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from ".";
import { inject, injectable, unmanaged } from "inversify";
import { EventPayloadType } from "@/types";
import { EventRepositoryInterface } from "@/interfaces";
@injectable()
export class EventApiService {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
    }

    /**
   * Cria um novo evento
   */
    async createEvent(payload: EventPayloadType): Promise<any> {
        try {
            const response = await this.api.post<any>(`/events`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar evento:', error);
            throw error;
        }
    }

    /**
   * Atualiza um  evento
   */
    async updateEvent(payload: EventPayloadType, eventId:number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/${eventId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            throw error;
        }
    }

    /**
   * Retorna uma lista de eventos com base nos parâmetros fornecidos.
   * @param {string} params - Parâmetros de filtro para a consulta de eventos.
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
    async events(params?: Record<string, string>): Promise<any> {
        try {
            const response = await this.api.get<any>(`/events?${new URLSearchParams(params)}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna os detalhes de um evento com base no ID fornecido.
     * @param {number|string} id - O ID do evento.
     * @returns {Promise<any>} Uma promessa que resolve com os detalhes do evento.
     */
    async event(id: number | string): Promise<any> {
        try {
            const response = await this.api.get<any>(`/events/${id}`);
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
            const response = await this.api.get<any>(`/events/${id}/related`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter eventos relacionados:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de categorias de eventos disponíveis.
     * @returns {Promise<any[]>} Uma promessa que resolve com uma lista de categorias de eventos.
     */
    async displayTypes(): Promise<any[]> {
        try {
            const response = await this.api.get<any[]>(
                `/event-categories`
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao obter categorias de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de banners de eventos para exibição.
     * @returns {Promise<any>} Uma promessa que resolve com uma lista de banners de eventos.
     */
    async banners(): Promise<any> {
        try {
            const response = await this.api.get<any>(`/event-banners`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de banners de eventos para exibição.
     * @returns {Promise<any>} Uma promessa que resolve com uma lista de banners de eventos.
     */
    async search(name: string): Promise<any> {
        try {
            const response = await this.api.get<any>(`/search?name=${name}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de categorias/tipos de eventos.
     * @returns {Promise<any>}
     */
    async categories(): Promise<any> {
        try {
            const response = await this.api.get<any>(`/event-categories`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna uma lista de cidades com eventos disponíveis
     * @returns {Promise<any>}
     */
    async avaiableCities(): Promise<any> {
        try {
            const response = await this.api.get<any>(`/avaiable-cities`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }

    /**
     * Retorna um token user_identifier para identificar impressões
     * @returns {Promise<any>}
     */
    async userIdentifier(): Promise<any> {
        try {
            const response = await this.api.get<any>(`/user-identifier`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter banners de eventos:', error);
            throw error;
        }
    }
}