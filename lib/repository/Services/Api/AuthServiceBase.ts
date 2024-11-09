import { AxiosInstance } from "axios";
import ApiService, { type ServiceContainerType } from './service';
import { injectable, unmanaged } from "inversify";
import { ApiResponseType, CredentialsType } from "@/types";
@injectable()
export class AuthServiceBase {

    protected api: AxiosInstance;

    /**
     * Cria uma nova instância do serviço de autenticação.
     */
    constructor(@unmanaged() serviceContainer: ServiceContainerType) {

        this.api = ApiService.configure(serviceContainer);
    }
}