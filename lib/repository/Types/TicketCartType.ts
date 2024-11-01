

export type TicketCartType = {
    customer: string
    customer_document: string
    email: string
    expire_at: string
    total_tax: number
    total_amount_tickets: number
    total_amount: number
    tickets: Array<{
        id: string
        name: string
        batch: string
        session: string
        quantity: number
        unit_price: number
        total: number
        ticket_type: string
        tax: number
        code: string
        description: string
    }>
}