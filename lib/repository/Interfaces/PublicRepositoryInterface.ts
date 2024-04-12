import { EventRepositoryInterface } from "./Event/EventRepositoryInterface";

export interface PublicRepositoryInterface extends EventRepositoryInterface {

    /**
   * Retorna um token user_identifier para identificar impressões
   * @returns {Promise<any>}
   */
    userIdentifier(): Promise<any>

    /**
    * Envia um tipo de interação do evento
    * @returns {Promise<any>}
    */
    eventInteraction(interaction: 'share' | 'click' | 'shake' | 'impression', id: number | string): Promise<any>;

    /**
    * Captura um novo lead
    * @returns {Promise<any>}
    */
    createLead(formData: Record<string, any>): Promise<any>;

}