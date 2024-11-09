import { SessionType } from "./TicketType";

export type EventDisplayType = {
    id?: number,
    name?: string,
    price?: number,
    size?: string,
}

export interface EventInterface {
    id: number;
    uuid?: string;
    name?: string;
    slug?: string;
    description?: string;
    event_image?: string;
    tags?: string;
    start_date?: string;
    end_date?: string;
    geolocation: string;
    full_address?: string;
    status: string;
    place_name?: string;
    place_city?: string;
    place_geolocation: string;
    city?: string;
    category?: string;
    impress?: number;
    impressions?: number
    clicks?: number
    has_external_ticket?: boolean;
    ticket_partner_name?: string,
    ticket_partner_url?: string;
    customer: Record<string, any>;
    place: Record<string, any>;
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
// types/TicketLotType.ts
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
    event_session_id: number;
    name: string;
    ticket_type: string;  // Defina tipos específicos se houver opções fixas, como "paid", "free", etc.
    quantity: number;
    sales_quantity: number;
    min_quantity: number;
    max_quantity: number;
    balance: number;
    price: number;
    code: string;
    avialable_quantity: number;
    description: string;
    is_visible: boolean | number;
    include_fee: boolean | number;
    is_selling: boolean
}
