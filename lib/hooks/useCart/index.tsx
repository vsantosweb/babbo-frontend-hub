import { LoginModal } from "@/components";
import { TicketType } from "@/repository/Types/TicketType";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "../useAuth";
import { useRouter } from "next/router";
import container from "@/repository/Services/container";
import { CustomerCartRepositoryInterface } from "@/interfaces";
import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";
import { EventTicketCartItemType, EventTicketCartType, EventTicketType, TicketCartType } from "@/types";
import moment from "moment";
import { EventEmitter } from 'events';

export const eventCart = new EventEmitter();

const customerCartService = container.get<CustomerCartRepositoryInterface>('customer-cart')
interface CartContextInterface {
    addCart: (tickets: EventTicketType[]) => void
    isLoading: boolean
    clearCart: () => void
    setCart: (cart: EventTicketCartType) => void
    cart: EventTicketCartType | null
    cartExpired: boolean
    duration: string | undefined,
    hydrateItemCart: (ticket: EventTicketType) => EventTicketCartItemType
}

export const CartContext = createContext<CartContextInterface | undefined>(undefined);

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
    const [cart, setCart] = useState<EventTicketCartType | null>(null)
    const [cartExpired, setCartExpired] = useState<boolean>(false)
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const router = useRouter();
    const [duration, setDuration] = useState<string>();

    //cart expiration check
    useEffect(() => {

        if (cart) {

            const expireAt = moment(cart?.expire_at);
            const now = moment();
            const durationTime = moment.duration(expireAt.diff(now));
            const countDown = setInterval(() => {
                setDuration(`${durationTime.minutes().toString().padStart(2, '0')}:${durationTime.seconds().toString().padStart(2, '0')}`);
                if (now > expireAt) {
                    setCartExpired(true)
                    clearCart()
                }
            }, 1000)

            return () => clearInterval(countDown);
        }
    }, [cart, duration])

    useEffect(() => {
        if (user && !requestLogin) {
            customerCartService.getCart().then(response => {

                setCart(response.data.data)

                if (!response.data.data &&  router.pathname.includes('payment')) {
                    clearCart()
                    setCartExpired(true)
                    return;
                }
            })
        }
    }, [user])

    useEffect(() => {

        const handleRestoreCart = async () => {
            await saveCartFromSession();
        };

        eventCart.on('userLoggedIn', handleRestoreCart);

        return () => {
            eventCart.off('userLoggedIn', handleRestoreCart);
        };
    }, [eventCart]);

    const dispatch = useDispatch();

    const { orders } = useSelector((state: Record<string, any>) => state.order);

    const saveCartFromSession = async (cartData = orders) => {
        if (cartData) {
            customerCartService.addCartItems(cartData)
                .then(() => {
                    router.push('/payment');
                    setIsLoading(false)
                })

            // clearSessionCart(); // Limpa o carrinho da sessão após sincronização
        }
    }

    const addCart = async (tickets: EventTicketType[]) => {

        const dispatchData = tickets.map(ticket => ({
            event_ticket_id: ticket.event_ticket_id,
            quantity: ticket.quantity
        }))

        if (user) {

            setIsLoading(true)
            await saveCartFromSession(dispatchData)
            return;
        };

        dispatch({ type: 'ADD_ORDER', payload: dispatchData });
        setRequestModalLogin({ redirect: '/payment', active: true })

    }

    const clearCart = async () => {
        dispatch({ type: 'CLEAR_ORDERS' });
        setCart(null)
    }

    const hydrateItemCart = (ticket: EventTicketType): EventTicketCartItemType => {
        return {
            event_ticket_id: ticket.id,
            name: ticket.name,
            session: ticket?.session,
            quantity: ticket.quantity,
            unit_price: ticket.price,
            total: ticket.quantity * ticket.price,
            ticket_type: ticket.ticket_type,
            tax: ticket.tax,
            code: ticket.code,
            description: ticket.description,
            min_quantity: ticket.min_quantity,
            max_quantity: ticket.max_quantity,
        }
    }

    return (
        <CartContext.Provider value={{ addCart, clearCart, isLoading, setCart, cart, cartExpired, duration, hydrateItemCart }}>
            {children}
        </CartContext.Provider>
    )
}