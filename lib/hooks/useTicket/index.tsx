import { TicketType } from "@/repository/Types/TicketType";
import _ from "lodash";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';

interface TicketContextInterface {
    handleTicket: (ticket: Record<string, any>, action: 'add' | 'remove') => void
    totalAmount: number
    selectedTickets: TicketType[]
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

    const [selectedTickets, setSelectedTickets] = useState<any[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const dispatch = useDispatch();

    useEffect(() => {
        setTotalAmount(selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0))
    }, [selectedTickets])

    const handleTicket = (ticket: Record<string, any>, action: 'add' | 'remove') => {

        switch (action) {
            case 'add':

                for (let item of selectedTickets) {
                    if (item.id === ticket.id) {
                        item.quantity = item.quantity + 1
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
                        item.quantity = item.quantity - 1
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
        <TicketContext.Provider value={{ handleTicket, selectedTickets, totalAmount }}>{children}</TicketContext.Provider>
    )
}