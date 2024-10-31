import { LoginModal } from "@/components";
import { TicketType } from "@/repository/Types/TicketType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import { useAuth } from "../useAuth";
import { useRouter } from "next/router";
import container from "@/repository/Services/container";
import { CustomerCartInterface } from "@/repository/Services/Api/Customer/Interfaces/CustomerCartInterface";

const customerCartService = container.get<CustomerCartInterface>('customer-cart')
interface CartContextInterface {
    addCart: (tickets: TicketType[]) => TicketType[] | boolean
    isLoading: boolean
    getCart: () => void
}

const CartContext = createContext<CartContextInterface | undefined>(undefined);

export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within an CartProvider');
    }

    return { ...context };
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [requestLogin, setRequestLogin] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { user } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (user && requestLogin) {
            console.log(user)
            router.push('/store/payment')
        }
    }, [user])

    const dispatch = useDispatch();

    const addCart = (tickets: TicketType[]) => {
        if (user) {

            setIsLoading(true)

            const dispatchData = tickets.map(ticket => ({
                event_ticket_id: ticket.id,
                quantity: ticket.quantity
            }))

            customerCartService.addCartItems(dispatchData)
                .then(response => {
                    console.log(response, 'response')

                    dispatch({ type: 'ADD_ORDER', payload: dispatchData });

                    router.push('/store/payment');
                    setIsLoading(false)
                })

            return tickets;
        };

        setRequestLogin(true)

        return false;

    }

    const getCart = async () => {
        return await customerCartService.getCart().then((response) => {
            console.log(response.data)
        })
    }
    return (
        <CartContext.Provider value={{ addCart, getCart, isLoading }}>
            {children}
            <LoginModal setRequestLogin={setRequestLogin} open={requestLogin} />
        </CartContext.Provider>
    )
}