import { EventSessionService } from "../Event/EventSessionService";

export class CustomerEventSessionService extends EventSessionService {

    constructor() {
        super('customer')
    }
}