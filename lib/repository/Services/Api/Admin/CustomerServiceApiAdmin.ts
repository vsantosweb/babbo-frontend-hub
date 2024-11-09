import { AdminBaseRepositoryInterface } from "@/repository/Interfaces";
import { ApiBaseService } from "../ApiBaseService";
import { injectable } from "inversify";

@injectable()
export class CustomerServiceApiAdmin extends ApiBaseService implements AdminBaseRepositoryInterface {

    constructor() {

        super('admin')
    }

    // Display a listing of the resource.
    async get(params?: Record<string, string>): Promise<any | null> {
        try {
            const response = await this.api.get(`/customers?${new URLSearchParams(params)}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async create(payload: Record<string, any>): Promise<any | null> {
        try {
            const response = await this.api.post<any>(`/customers`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async show(id: number | string): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/customers/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async update(payload: any, id: number): Promise<any> {
        try {
            const response = await this.api.patch<any>(`/customers/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            throw error;
        }
    }

    // Display a listing of the resource.
    async destroy(id: number): Promise<any | null> {
        try {
            const response = await this.api.delete<any>(`/customers/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    //Event acount summary
    async countSummary(): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/customers/count-summary`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

