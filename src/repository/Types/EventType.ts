export type EventDisplayType = {
    id?: number,
    name?: string,
    price?: number,
    size?: string,
}

export type EventType = {
    id?: number;
    uuid?: string;
    name?: string;
    slug?: string;
    description?: string;
    banner_url?: string;
    tags?: string;
    start_date?: string;
    geolocation?: string;
    full_address?: string;
    place_name?: string;
    city?: string;
    categories?: string[];
    impress?: number;
}


export interface EventBanner {
    uuid: string;
    slug: string;
    banner_url: string;
    impressions: number;
}
