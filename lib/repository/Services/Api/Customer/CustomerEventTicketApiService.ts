import { CustomerEventTicketRepositoryInterface } from "@/interfaces";
import CustomerApiService from "./CustomerApiService";
import { ApiResponseType } from "@/types";
import { EventTicketService } from "../Event/EventTicketService";

export class CustomerEventTicketApiService extends EventTicketService implements CustomerEventTicketRepositoryInterface {
    
    constructor(){
        super('customer')
    }
    async ticketSales(eventId: string): Promise<ApiResponseType> {
        
        return await this.api.get( `events/${eventId}/ticket-sales`);
    }

}