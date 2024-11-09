
import { ApiResponseType } from "@/types";

export interface CustomerEventTicketRepositoryInterface {

    ticketSales(eventId: string): Promise<ApiResponseType>
}
