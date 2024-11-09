// services/EventTicketService.ts
import { EventTicketRepositoryInterface } from "@/interfaces";
import { EventTicketType } from "@/types";
import { ApiBaseService } from "../ApiBaseService";

export class EventTicketService extends ApiBaseService implements EventTicketRepositoryInterface {

    async get(sessionId: number): Promise<any> {
        try {
            const response = await this.api.get<any>(`/events/sessions/${sessionId}/tickets`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter tickets do lote:", error);
            throw error;
        }
    }

    async create(formData: EventTicketType, sessionId: number): Promise<any> {
        try {
            const response = await this.api.post<any>(`/events/sessions/${sessionId}/tickets`, formData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar ticket no lote:", error);
            throw error;
        }
    }

    async show(id: number | string): Promise<any> {
        try {
            const response = await this.api.get<any>(`/tickets/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter o ticket:", error);
            throw error;
        }
    }

    async update(payload: EventTicketType, sessionId: number, ticketId: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/sessions/${sessionId}/tickets/${ticketId}`, payload);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar o ticket no lote:", error);
            throw error;
        }
    }

    async destroy(sessionId: number, ticketId: number): Promise<any> {
        try {
            await this.api.delete(`/events/sessions/${sessionId}/tickets/${ticketId}`);
        } catch (error) {
            console.error("Erro ao remover o ticket do lote:", error);
            throw error;
        }
    }
}
