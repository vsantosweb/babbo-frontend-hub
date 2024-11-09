import { AdminEventSessionRepositoryInterface } from "@/repository/Interfaces";
import { ApiBaseService } from "../ApiBaseService";
import { injectable } from "inversify";
import { EventPayloadType } from "@/types";

@injectable()
export class EventSessionServiceApiAdmin extends ApiBaseService implements AdminEventSessionRepositoryInterface {

    constructor() {
        super('admin')
    }

    // Display a listing of the resource.
    async get(eventId:number): Promise<any | null> {
        try {
            const response = await this.api.get(`/events/${eventId}/sessions`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async create(payload: Record<string, any>, eventId: number): Promise<any | null> {
        try {
            const response = await this.api.post<any>(`/events/${eventId}/sessions`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async show(id: number | string): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/events/${id}/sessions`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async update(payload: EventPayloadType, eventId: number, sessionId: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/${eventId}/sessions/${sessionId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async destroy(eventId: number, sessionId: number): Promise<any | null> {
        try {
            const response = await this.api.delete<any>(`/events/${eventId}/sessions/${sessionId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    //Event acount summary
    async countSummary(): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/events/count-summary`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

