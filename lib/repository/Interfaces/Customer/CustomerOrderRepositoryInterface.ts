
export interface CustomerOrderRepositoryInterface {

    create(payload: Record<string, any>): Promise<any>
    tickets(): Promise<any>
}
