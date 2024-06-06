import { AdminEventRepositoryInterface } from "@/interfaces";
import { ApiBaseService } from "../ApiBaseService";
import { injectable } from "inversify";
import { EventPayloadType } from "@/types";

@injectable()
export class EventServiceApiAdmin extends ApiBaseService implements AdminEventRepositoryInterface {

    constructor() {

        super('admin')
    }

    // Display a listing of the resource.
    async get(params?: Record<string, string>): Promise<any | null> {
        try {
            const response = await this.api.get(`/events?${new URLSearchParams(params)}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async create(payload: Record<string, any>): Promise<any | null> {
        try {
            const response = await this.api.post<any>(`/events`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async show(id: number | string): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async update(payload: EventPayloadType, eventId: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/events/${eventId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async destroy(id: number): Promise<any | null> {
        try {
            const response = await this.api.delete<any>(`/events/${id}`);
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

