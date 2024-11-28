
export type EventTicketCartType = {
    customer: string,
    customer_document: string,
    email: string,
    expire_at: string,
    total_tax: number,
    total_amount_tickets: number,
    total_amount: number,
    tickets: EventTicketCartItemType[],
}

export type EventTicketCartItemType = {
    event_ticket_id: number,
    name: string,
    session?: string | null,
    quantity: number,
    unit_price: number,
    total: number,
    ticket_type: string,
    tax: number,
    code: string,
    description: string,
    min_quantity: number
    max_quantity: number
}

