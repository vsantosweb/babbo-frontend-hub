import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface TicketContextInterface {
    handleTicket: (ticket: Record<string, any>, action: 'add' | 'remove') => Record<string, any>[]
    totalAmount: number
    selectedTickets: Record<string, any>[]
}

const TicketContext = createContext<TicketContextInterface | undefined>(undefined);

export function useTicket() {

    const context = useContext(TicketContext);

    if (!context) {
        throw new Error('useTicket must be used within an AccessibilityProvider');
    }

    return { ...context };
}

export function TicketProvider({ children }: { children: ReactNode }) {

    const [selectedTickets, setSelectedTickets] = useState<any[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        setTotalAmount(selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0))
    },[selectedTickets])

    const handleTicket = (ticket: Record<string, any>, action: string) => {
        
        switch (action) {

            case 'add':

                for (let item of selectedTickets) {

                    if (item.id === ticket.id) {
                        item.quantity = item.quantity + 1
                        setSelectedTickets([...selectedTickets])
                        return;
                    }
                }

                ticket.quantity = 1;
                setSelectedTickets([...selectedTickets, ticket])
                break;

            case 'remove':

                for (let item of selectedTickets) {

                    if (item.id === ticket.id) {
                        item.quantity = item.quantity - 1
                        setSelectedTickets([...selectedTickets])
                        return;
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