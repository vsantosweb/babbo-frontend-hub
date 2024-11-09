import { EventTicketType } from "@/repository/Types/EventType";
import { TicketType } from "@/repository/Types/TicketType";
import _ from "lodash";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';

interface TicketContextInterface {
    handleTicket: (ticket: EventTicketType, action: 'add' | 'remove') => void
    totalAmount: number
    selectedTickets: EventTicketType[]
    setSelectedTickets: (data: EventTicketType[]) => void
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

    const [selectedTickets, setSelectedTickets] = useState<EventTicketType[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const dispatch = useDispatch();

    useEffect(() => {
        setTotalAmount(selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0))
    }, [selectedTickets])

    const handleTicket = (ticket: EventTicketType, action: 'add' | 'remove') => {

        switch (action) {
            case 'add':
 
                for (let item of selectedTickets) {
                    if (item.id === ticket.id) {
                        item.quantity++
                        setSelectedTickets([...selectedTickets])
                        return ticket;
                    }
                }
                ticket.quantity = 1;
                setSelectedTickets([...selectedTickets, ticket])

                break;
            case 'remove':
                for (let item of selectedTickets) {
                    if (item.id === ticket.id) {
                        item.quantity--
                        if (item.quantity === 0) _.remove(selectedTickets, item)
                        setSelectedTickets([...selectedTickets])
                        return ticket;
                    }
                }
            default:
                break;
        }

    }

    return (
        <TicketContext.Provider value={{ handleTicket, selectedTickets, setSelectedTickets, totalAmount }}>{children}</TicketContext.Provider>
    )
}