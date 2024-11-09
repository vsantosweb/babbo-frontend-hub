
export interface CustomerCartRepositoryInterface {

    addCartItems(payload: Record<string, any>): Promise<any>
    getCart(): Promise<any>
}
