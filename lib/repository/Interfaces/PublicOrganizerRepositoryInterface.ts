
export interface PublicOrganizerRepositoryInterface {
    /**
   * Retorna o perfil do organizador.
   * @returns {Promise<any>}.
   */
    organizerProfile(id: number | string): Promise<any>


    /**
   * Retorna os eventos do organizador.
   * @param {number|string} id - O ID do organizador.
   * @returns {Promise<any>}
   */
    organizerEvents(id?: number | string, params?: Record<string, string>): Promise<any>

    /**
  * Retorna a vitrine de orgaizadores.
  * @returns {Promise<any>}.
  */
    organizerShowcase(): Promise<any>
}