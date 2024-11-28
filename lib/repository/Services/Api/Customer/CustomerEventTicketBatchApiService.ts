// services/EventTicketLotService.ts
import { EventTicketBatchService } from "../Event/EventTicketBatchService";
export class CustomerEventTicketBatchApiService extends EventTicketBatchService {
    constructor() {
        super('customer')
    }
}
