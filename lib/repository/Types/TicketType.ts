1


export type SessionType = {
    id: string
    name: string
    event_date: string
    ticket_batches: Array<TicketBatchType>
}

export type TicketBatchType = {
    id: number
    name: string
    start_date: string
    end_date: string
    is_current: boolean
    sold_out: string
    tickets: Array<TicketType>
}

export type TicketType = {
    id?: number
    name: string
    ticket_type: string
    avaiable_quantity: number
    price: number
    tax: number
    min_quantity: number
    max_quantity: number
    is_visible: boolean
    quantity?: number
}
