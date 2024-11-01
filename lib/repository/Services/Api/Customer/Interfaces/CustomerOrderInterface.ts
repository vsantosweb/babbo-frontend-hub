
export interface CustomerOrderInterface {

    create(payload: Record<string, any>): Promise<any>
    tickets(): Promise<any>
}
