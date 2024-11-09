// services/EventTicketLotService.ts
import { EventTicketLotType } from "@/types";
import { ApiBaseService } from "../ApiBaseService";
import { EventTicketBatchService } from "../Event/EventTicketBatchService";

export class CustomerEventTicketBatchApiService extends EventTicketBatchService {
    constructor() {
        super('customer')
    }
}
