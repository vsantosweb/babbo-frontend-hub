export type PlaceType = {
    full_address: string;
    name: string;
    zipcode: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    address_number: string;
}

export type EventPayloadType = {
    place: PlaceType;
    start_date: string;
    end_date: string;
    category: any;
    name: string;
    description: string;
    event_image?: string;
    has_external_ticket?: string;
    ticket_partner_name?: string;
    ticket_partner_url?: string;
    is_recurring?: boolean;
    recurrence_pattern?: 'daily' | 'weekly' | 'monthly'
}

export type CustomerPayloadType = {
    name?: string;
    email?: string;
    phone?: string;
    photo_profile?: string;
    is_organizer?: string;
    organizer_name?: string;
    organizer_email?: string;
    organizer_instagram?: string;
}
