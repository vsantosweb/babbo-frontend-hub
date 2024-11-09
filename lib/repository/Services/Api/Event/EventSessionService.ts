import { EventSessionRepositoryInterface } from "@/interfaces";
import { EventSessionType } from "@/types";
import { ApiBaseService } from "../ApiBaseService";


export class EventSessionService extends ApiBaseService implements EventSessionRepositoryInterface  {

    async get(eventId: number): Promise<any> {
        try {
            const response = await this.api.get<any>(`/events/${eventId}/sessions`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter sessões do evento:", error);
            throw error;
        }
    }

    async create(formData: EventSessionType, eventId: number): Promise<any> {
        try {
            const response = await this.api.post<any>(`/events/${eventId}/sessions`, formData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar sessão do evento:", error);
            throw error;
        }
    }

    async show(id: number | string): Promise<any> {
        try {
            const response = await this.api.get<any>(`/sessions/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter a sessão:", error);
            throw error;
        }
    }

    async update(payload: EventSessionType, eventId: number, sessionId: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/${eventId}/sessions/${sessionId}`, payload);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar a sessão do evento:", error);
            throw error;
        }
    }

    async destroy(eventId: number, sessionId: number): Promise<any> {
        try {
            await this.api.delete(`/events/${eventId}/sessions/${sessionId}`);
        } catch (error) {
            console.error("Erro ao remover a sessão do evento:", error);
            throw error;
        }
    }

}