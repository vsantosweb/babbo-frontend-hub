export type EventDisplayType = {
    id?: number,
    name?: string,
    price?: number,
    size?: string,
}

export interface EventInterface  {
    id?: number;
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
    status:string;
    place_name?: string;
    place_city?: string;
    place_geolocation:string;
    city?: string;
    category?: string;
    impress?: number;
    impressions?:number
    clicks?:number
    has_external_ticket?:boolean;
    ticket_partner_name?: string,
    ticket_partner_url?:string;
    organizer?:{
        organizer_id?: string,
        organizer_name?: string,
    }
}


export interface EventBanner {
    uuid: string;
    slug: string;
    event_image: string;
    impressions: number;
}
