import { EventTicketCartItemType } from "@/types";
import {  EventTicketType } from "@/repository/Types/EventType";
import { TicketType } from "@/repository/Types/TicketType";
import _ from "lodash";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';

interface TicketContextInterface {
    handleTicket: (ticket: EventTicketCartItemType, action: 'add' | 'remove') => void
    totalAmount: number
    selectedTickets: EventTicketCartItemType[]
    setSelectedTickets: (data: EventTicketCartItemType[]) => void
    ticketCount: Array<{ id: number, quantity: number }>
    setTicketCount: (data: Array<{ id: number, quantity: number }>) => void
}

const TicketContext = createContext<TicketContextInterface | undefined>(undefined);

export function useTicket() {

    const context = useContext(TicketContext);

    if (!context) {
        throw new Error('useTicket must be used within an TicketProvider');
    }

    return { ...context };
}

export function TicketProvider({ children }: { children: ReactNode }) {

    const [selectedTickets, setSelectedTickets] = useState<EventTicketCartItemType[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [ticketCount, setTicketCount] = useState<Array<{ id: number, quantity: number }>>([])
    const dispatch = useDispatch();

    useEffect(() => {
        setTotalAmount(selectedTickets.reduce((sum, ticket) => sum + ticket.unit_price * ticket.quantity, 0))
    }, [selectedTickets])

    const handleTicket = (ticket: EventTicketCartItemType, action: 'add' | 'remove') => {

        switch (action) {
            case 'add':

                for (let item of selectedTickets) {
                    if (item.event_ticket_id === ticket.event_ticket_id) {

                        if (ticket.quantity < ticket.min_quantity) {
                            item.quantity = ticket.min_quantity
                        } else { item.quantity++ }

                        setSelectedTickets([...selectedTickets])
                        return ticket;
                    }
                }
                // ticket.quantity = 1;
                setSelectedTickets([...selectedTickets, ticket])

                break;
            case 'remove':
                for (let item of selectedTickets) {
                    if (item.event_ticket_id === ticket.event_ticket_id) {

                        if (ticket.quantity > ticket.min_quantity) {
                            item.quantity--
                        } else { item.quantity = item.quantity - ticket.min_quantity }

                        // if (item.quantity === 0) _.remove(selectedTickets, item)
                        setSelectedTickets([...selectedTickets])
                        return ticket;
                    }
                }
            default:
                break;
        }

    }

    return (
        <TicketContext.Provider value={{
            handleTicket,
            selectedTickets,
            setSelectedTickets,
            totalAmount,
            ticketCount,
            setTicketCount
        }}>{children}</TicketContext.Provider>
    )
}