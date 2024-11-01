import { CreditCardType } from "./CreditCardType"

export type PaymentMethodType = {
    event_ticket_cart_id: number
    payment_method: string
    card?: CreditCardType
    billet?: CreditCardType
}
