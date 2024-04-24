import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from ".";
import { inject, injectable, unmanaged } from "inversify";
import { EventPayloadType } from "@/types";
import { EventRepositoryInterface } from "@/interfaces";
@injectable()
export class CustomerApiService {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
    }
}