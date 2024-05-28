import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from ".";
import { injectable, unmanaged } from "inversify";

@injectable()
export class ApiBaseService {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de eventos do cliente.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
    }
}