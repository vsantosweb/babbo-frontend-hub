import { EventPayloadType } from "@/types";
import moment from "moment";

export function eventPayloadResolver(formData: Record<string, any>) {

    const payload: EventPayloadType = {
        name: formData?.name,
        place: formData?.place,
        has_external_ticket: formData?.has_external_ticket,
        ticket_partner_name: formData?.ticket_partner_name,
        ticket_partner_url: formData?.ticket_partner_url,
        start_date: moment(formData?.start_date).format('YYYY-MM-DD HH:mm'),
        end_date: moment(formData?.end_date).format('YYYY-MM-DD HH:mm'),
        description: formData?.description,
        category: formData?.category,
    }

    if (formData.image) payload.event_image = formData.event_image;

    return payload;
}