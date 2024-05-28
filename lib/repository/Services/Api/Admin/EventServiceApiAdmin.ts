import { AdminEventRepositoryInterface } from "@/interfaces";
import { ApiBaseService } from "../ApiBaseService";
import { injectable } from "inversify";

@injectable()
export class EventServiceApiAdmin extends ApiBaseService implements AdminEventRepositoryInterface {

    constructor() {

        super('admin')
    }

    // Display a listing of the resource.
    async get(): Promise<any | null> {
        try {
            const response = await this.api.get(`/events`);
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
    async update(payload: Record<string, any>, eventId: number): Promise<any | null> {
        try {
            const response = await this.api.post<any>(`/events`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async destroy(id: number): Promise<any | null> {
        try {
            const response = await this.api.post<any>(`/events`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

