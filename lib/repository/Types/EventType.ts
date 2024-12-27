import { SessionType } from "./TicketType";

export type EventDisplayType = {
    id?: number,
    name?: string,
    price?: number,
    size?: string,
}

export interface EventInterface {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    description: string;
    event_image: string;
    available_tickets: boolean;
    tags?: string;
    start_date?: string;
    end_date?: string;
    geolocation: string;
    full_address: string;
    status: string;
    place_name: string;
    place_city: string;
    place_geolocation: string;
    city: string;
    place_formatted_address: string;
    is_private: boolean;
    category: string;
    impress?: number;
    impressions?: number
    clicks?: number
    has_external_ticket?: boolean;
    ticket_partner_name?: string,
    ticket_partner_url?: string;
    customer: Record<string, any>;
    place: Record<string, any>;
    place_address_2: string;
    place_zipcode: string;
    place_state: string;
    place_address_number: string;
    organizer?: {
        organizer_id?: string,
        organizer_name?: string,
    }
    sessions?: Array<SessionType>
}

export interface EventBanner {
    uuid: string;
    slug: string;
    event_image: string;
    impressions: number;
}

export type EventSessionType = {
    id: number,
    name: string,
    event_date: string
    tickets?: Array<EventTicketType>
}
export interface EventTicketBatchType {
    id?: number;
    uuid?: string;
    event_session_id?: number;
    name?: string;
    is_current?: number;
    sort?: number;
    start_date?: string;
    end_date?: string;
    sold_out?: number;
    sold_out_at?: string | null;
    sale_type?: string;
    tickets?: Array<EventTicketType>
}

// types/TicketType.ts
export interface EventTicketType {
    id: number
    event_ticket_id: number,
    event_session_id: number;
    name: string;
    session?:string
    ticket_type: string; 
    quantity: number;
    sales_quantity: number;
    min_quantity: number;
    max_quantity: number;
    balance: number;
    tax: number;
    price: string;
    unit_price: number;
    code: string;
    avialable_quantity: number;
    description: string;
    is_visible: boolean | number;
    include_fee: boolean | number;
    is_selling: boolean
    sold_out: boolean

}

export type EventTicketCartType = {
    id: number,
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
    sold_out?: boolean,
    session?: string | null,
    quantity: number,
    unit_price: number | string,
    total: number,
    ticket_type: string,
    tax: number,
    code: string,
    description: string,
    min_quantity: number
    max_quantity: number
}

