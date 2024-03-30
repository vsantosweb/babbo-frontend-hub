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
    place: PlaceType
    start_date: string;
    end_date: string;
    categories: any ;
    name: string;
    event_image?: string; // Assuming event_image is an optional field
}
