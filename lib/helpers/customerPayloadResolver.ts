import { CustomerPayloadType } from "@/types";

export function customerPayloadResolver(formData: Record<string, any>) {

    const payload: CustomerPayloadType = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo_profile: formData.photo_profile,
        is_organizer: formData.is_organizer,
        organizer_name: formData.organizer_name,
        organizer_email: formData.organizer_email,
        organizer_instagram: formData.organizer_instagram,
    }
    
    return payload;
}

