export type PurchasesProps = {
    name: string
    event_id: number
    session: string
    order: string
    order_date: string
    event_image: string
    event_name: string
    event_address: string
    quantity: number
    items: Array<PurchaseTicketProps>
}

export type PurchaseTicketProps = {
    ticket: string
    validated: boolean
    validated_at: string | null
    batch: string
    name: string
    ticket_type: string
    description: string
    qrcode: string
    total_amount: number;

}
