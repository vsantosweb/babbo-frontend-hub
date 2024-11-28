import {
    Heading,
    Stack,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    Flex,
} from "@chakra-ui/react";
import TicketCard from "../TicketCard";
import { useCart, useTicket } from "@/hooks";
import { EventTicketCartItemType, EventSessionType,  EventTicketType } from "@/types";
import Datebox from "@/components/Datebox";
import { useEffect } from "react";



// {
//     "id": 1,
//     "name": "Mezanino",
//     "ticket_type": "paid",
//     "available_quantity": 300,
//     "pending_quantity": 0,
//     "price": 170.3,
//     "tax": 0.11,
//     "min_quantity": 1,
//     "max_quantity": 10,
//     "quantity": 0,
//     "is_visible": 1,
//     "sold_out": 0,
//     "batches": []
// }

export default function TicketSelector({ sessions }: { sessions: EventSessionType[] }) {

    const { handleTicket, selectedTickets, setSelectedTickets } = useTicket();
    const { cart, hydrateItemCart } = useCart();

    useEffect(() => {

        let tickets: Array<EventTicketCartItemType> = []

        
        if (cart){
            setSelectedTickets(cart.tickets)
            return
        }
        
        sessions.map(session => {
            session?.tickets && session?.tickets.map(ticket => {
                console.log(ticket, 'ticket ticket-')
                tickets.push(hydrateItemCart(ticket))
            })
        })

        setSelectedTickets(tickets)
    }, [cart])

    function disableIncrement(ticket: EventTicketCartItemType, index: number) {

        return ticket.quantity === ticket?.max_quantity;
    }

    return (
        <Stack spacing={6} pb={{base: '120px'}}>

            <Accordion boxShadow={'lg'} defaultIndex={[0]} as={Box} width={'100%'} borderWidth="1px" borderRadius="xl" reduceMotion allowMultiple>
                {sessions.map((session, index) => <AccordionItem  key={index} border='none'>
                    <AccordionButton borderBottomWidth='1px'   gap='6' as={Box} pl={0} borderRadius="lg" overflow="hidden" cursor="pointer">
                        <Box>
                            <Datebox date={session.event_date} />
                        </Box>
                        <Heading size={{xs: 'sm', sm: 'md'}} flex='2'>{session.name}</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel   p='0'>
                        {selectedTickets?.map((ticket, index) => {
                            return <TicketCard
                                disableIncrement={!!disableIncrement(ticket, index)}
                                onChange={handleTicket}
                                key={index}
                                ticket={ticket} />
                        })}
                    </AccordionPanel>
                </AccordionItem>
                )}
                
            </Accordion>

        </Stack>
    )
}
