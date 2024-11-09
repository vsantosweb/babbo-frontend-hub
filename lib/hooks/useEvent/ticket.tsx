import { useEffect, useState } from 'react';
import { EventTicketRepositoryInterface } from '@/interfaces';
import container from '@/container';
import { ApiResponseType, EventTicketType } from '@/types';

export interface EventTicketInterface {
    handleCreateTicket(payload: EventTicketType, sessionId: number): Promise<unknown>;
    handleUpdateTicket(payload: EventTicketType, sessionId: number, ticketId: number): Promise<unknown>;
    handleDeleteTicket(sessionId: number, ticketId: number): Promise<unknown>;
    getTickets(sessionId: number): Promise<ApiResponseType>;
    tickets: EventTicketType[] | null;
}

type Repository = 'customer' | 'admin';

export function useEventTicket<T extends Repository>(repository: T): EventTicketInterface {

    const eventTicketService = container.get<EventTicketRepositoryInterface>(`${repository}-event-ticket`);
    
    const [tickets, setTickets] = useState<EventTicketType[] | null>(null);
    const [hydrate, setHydrate] = useState<number | null>();

    const getTickets = async (sessionId: number) => {
       return eventTicketService.get(sessionId).then(response => response);
    };

    const handleCreateTicket = async (payload: EventTicketType, sessionId: number) => {
        return await eventTicketService.create(payload, sessionId).then((response) => {
            setHydrate(Math.random());
            return response;
        });
    };

    const handleUpdateTicket = async (payload: EventTicketType, sessionId: number, ticketId: number): Promise<unknown> => {
        return await eventTicketService.update(payload, sessionId, ticketId).then(() => setHydrate(Math.random()));
    };

    const handleDeleteTicket = async (sessionId: number, ticketId: number) => {
        return await eventTicketService.destroy(sessionId, ticketId).then(() => setHydrate(Math.random()));
    };

    return { handleCreateTicket, handleUpdateTicket, handleDeleteTicket, getTickets, tickets };
}
