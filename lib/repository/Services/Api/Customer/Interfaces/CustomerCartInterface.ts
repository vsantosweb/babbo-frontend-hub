
export interface CustomerCartInterface {

    addCartItems(payload: Record<string, any>): Promise<any>
    getCart(): Promise<any>
}
