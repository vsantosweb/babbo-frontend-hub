import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from "../service";
import {  injectable, unmanaged } from "inversify";
@injectable()
export default abstract class CustomerApiService {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
    }
}