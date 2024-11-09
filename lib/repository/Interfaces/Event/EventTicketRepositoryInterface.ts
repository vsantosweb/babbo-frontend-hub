// interfaces/EventTicketRepositoryInterface.ts
import { EventTicketType } from "@/types";

export interface EventTicketRepositoryInterface {
    get(sessionId: number): Promise<any>;
    create(formData: EventTicketType, sessionId: number): Promise<any>;
    show(id: number | string): Promise<any>;
    update(payload: EventTicketType, sessionId: number, ticketId: number): Promise<any>;
    destroy(sessionId: number, ticketId: number): Promise<any>;
}
