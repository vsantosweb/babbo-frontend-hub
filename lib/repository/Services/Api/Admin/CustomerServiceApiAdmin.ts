import { AdminBaseRepositoryInterface } from "@/interfaces";
import { ApiBaseService } from "../ApiBaseService";
import { injectable } from "inversify";

@injectable()
export class CustomerServiceApiAdmin extends ApiBaseService implements AdminBaseRepositoryInterface {

    constructor() {

        super('admin')
    }

    // Display a listing of the resource.
    async get(): Promise<any | null> {
        try {
            const response = await this.api.get<any>(`/customers`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados:', error);
            throw error;
        }
    }
}

