import { EventRepositoryInterface } from "./Event/EventRepositoryInterface";

export interface PublicRepositoryInterface extends EventRepositoryInterface {

    /**
   * Retorna um token user_identifier para identificar impressões
   * @returns {Promise<any>}
   */
    userIdentifier(): Promise<any>
}