import { EventTicketBatchRepositoryInterface } from "@/interfaces";
import { EventTicketBatchType } from "@/types";
import { ApiBaseService } from "../ApiBaseService";

export class EventTicketBatchService extends ApiBaseService implements EventTicketBatchRepositoryInterface {

    async get(ticketId: number): Promise<any> {
        try {
            const response = await this.api.get<any>(`/events/sessions/${ticketId}/batches`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter lotes de ingressos da sessão do evento:", error);
            throw error;
        }
    }

    async create(formData: EventTicketBatchType, ticketId: number): Promise<any> {
        try {
            const response = await this.api.post<any>(`/events/sessions/${ticketId}/batches`, formData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar lote de ingressos da sessão do evento:", error);
            throw error;
        }
    }

    async show(id: number | string): Promise<any> {
        try {
            const response = await this.api.get<any>(`/batches/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter o lote de ingressos:", error);
            throw error;
        }
    }

    async update(payload: EventTicketBatchType, ticketId: number, ticketBatchId: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/sessions/${ticketId}/batches/${ticketBatchId}`, payload);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar o lote de ingressos da sessão do evento:", error);
            throw error;
        }
    }

    async destroy(ticketId: number, ticketBatchId: number): Promise<any> {
        try {
            await this.api.delete(`/events/sessions/${ticketId}/batches/${ticketBatchId}`);
        } catch (error) {
            console.error("Erro ao remover o lote de ingressos da sessão do evento:", error);
            throw error;
        }
    }
}
