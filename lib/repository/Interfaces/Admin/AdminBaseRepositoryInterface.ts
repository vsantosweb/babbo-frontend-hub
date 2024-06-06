/**
 * Interface para o repositório base de administração.
 */
export interface AdminBaseRepositoryInterface {
    /**
     * Recupera uma lista de recursos.
     *
     * @returns {Promise<any>} Uma promessa que resolve com a lista de recursos.
     */
    get(params?: Record<string, any>): Promise<any>;

    /**
     * Cria um novo recurso.
     *
     * @returns {Promise<any>} Uma promessa que resolve com o recurso criado.
     */
    create(formData: Record<string, any>): Promise<any>;

    /**
     * Exibe um recurso específico.
     *
     * @param {number | string} id - O identificador do recurso.
     * @returns {Promise<any>} Uma promessa que resolve com o recurso encontrado.
     */
    show(id: number | string): Promise<any>;

    /**
     * Atualiza um recurso específico.
     *
     * @param {Record<string, any>} payload - Os dados a serem atualizados no recurso.
     * @param {number} eventId - O identificador do recurso a ser atualizado.
     * @returns {Promise<any>} Uma promessa que resolve com o recurso atualizado.
     */
    update(payload: Record<string, any>, eventId: number): Promise<any>;

    /**
     * Remove um recurso específico.
     *
     * @param {number} id - O identificador do recurso a ser removido.
     * @returns {Promise<any>} Uma promessa que resolve quando o recurso é removido.
     */
    destroy(id: number): Promise<any>;
}
