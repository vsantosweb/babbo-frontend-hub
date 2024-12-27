
export interface CustomerCartRepositoryInterface {

    addCartItems(payload: Record<string, any>): Promise<any>
    getCart(): Promise<any>
    deleteCart(id: number): Promise<any>
}
