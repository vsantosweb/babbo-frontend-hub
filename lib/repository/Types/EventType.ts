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
    geolocation?: string;
    full_address?: string;
    status:string;
    place_name?: string;
    city?: string;
    categories?: string[];
    impress?: number;
    has_tickets?:boolean;
    impressions?:number
    clicks?:number
}


export interface EventBanner {
    uuid: string;
    slug: string;
    event_image: string;
    impressions: number;
}
