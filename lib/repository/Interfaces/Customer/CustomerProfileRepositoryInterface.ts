import { EventRepositoryInterface } from '@/repository/Interfaces';
/**
 * Interface que define métodos para recuperar informações sobre eventos do cliente.
 */
export interface CustomerProfileRepositoryInterface {

    /**
   * Recupera os dados do perfil do usuário logado
   * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
   */
    me(): Promise<any>;

    /**
    * Atualiza os dados básico do usuário.
    * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
    */
    updateBasicInfo(payload: Record<string, any>): Promise<any>;

    /**
    * Atualiza a senha do usuário.
    * @returns {Promise<any>} Uma promessa que resolve com uma lista de eventos.
    */
    changePassword(payload: Record<string, any>): Promise<any>;
}
