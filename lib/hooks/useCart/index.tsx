import { LoginModal } from "@/components";
import { TicketType } from "@/repository/Types/TicketType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import { useAuth } from "../useAuth";
import { useRouter } from "next/router";
import container from "@/repository/Services/container";
import { CustomerCartRepositoryInterface } from "@/interfaces";
import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";
import { EventTicketType, TicketCartType } from "@/types";
import moment from "moment";

const customerCartService = container.get<CustomerCartRepositoryInterface>('customer-cart')
interface CartContextInterface {
    addCart: (tickets: EventTicketType[]) => EventTicketType[] | boolean
    isLoading: boolean
    clearCart: () => void
    setCart: (cart: TicketCartType) => void
    cart: TicketCartType | null
    cartExpired: boolean
    duration: string | undefined
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
    const { user, setRequestModalLogin } = useAuth();
    const [cart, setCart] = useState<TicketCartType | null>(null)
    const [cartExpired, setCartExpired] = useState<boolean>(false)
    const router = useRouter();
    const [duration, setDuration] = useState<string>();

    useEffect(() => {

        if(cart){

            const expireAt = moment(cart?.expire_at);
            const now = moment();
            const durationTime = moment.duration(expireAt.diff(now));
            const countDown = setInterval(() => {
                setDuration(`${durationTime.minutes().toString().padStart(2, '0')}:${durationTime.seconds().toString().padStart(2, '0')}`);

                if(now > expireAt) {
                    setCartExpired(true)
                    clearCart()
                }
            }, 1000)
    
            return () => clearInterval(countDown);
        }
    }, [duration, cart])

    useEffect(() => {
        if (user && !requestLogin) {
            customerCartService.getCart().then(response => {
                console.log(response.data.data, 'response.data.data')
                setCart(response.data.data)
                if (!response.data.data) {
                    setCartExpired(true)
                    clearCart()
                }
            })
        }
    }, [user])

    const dispatch = useDispatch();

    const addCart = (tickets: EventTicketType[]) => {
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

        setRequestModalLogin({ redirect: '/store/payment', active: true })

        return false;

    }

    const clearCart = async () => {
        dispatch({ type: 'CLEAR_ORDERS' });
        setCartExpired(true);
        setCart(null)
    }
    return (
        <CartContext.Provider value={{ addCart, clearCart, isLoading, setCart, cart, cartExpired, duration }}>
            {children}
        </CartContext.Provider>
    )
}