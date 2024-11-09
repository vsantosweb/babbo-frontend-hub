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
import { useTicket } from "@/hooks";
import { EventSessionType, EventTicketType } from "@/types";
import Datebox from "@/components/Datebox";
import { useEffect } from "react";


export default function TicketSelector({ sessions }: { sessions: EventSessionType[] }) {

    const { handleTicket, selectedTickets, setSelectedTickets } = useTicket();

    useEffect(() => {

        let tickets: Array<EventTicketType> = []
    
        sessions.map(session => session.tickets && tickets.push(...session.tickets))  
        setSelectedTickets(tickets)
        console.log(tickets, 'ticketsticketsticketsticketstickets')

    },[])
    function disableIncrement(ticket: EventTicketType, index: number) {
        
        if(selectedTickets[index]){

                console.log(ticket.name, selectedTickets[index]?.quantity,ticket?.max_quantity, 'selectedTickets[index]?.quantity === ticket?.max_quantity')
                return selectedTickets[index]?.quantity === ticket?.max_quantity;

        }
    }

    return (
        <Stack spacing={6}>

            <Accordion as={Box} width={'100%'} borderWidth="1px" borderRadius="xl" reduceMotion allowToggle>
                {sessions.map((session, index) => <AccordionItem key={index} border='none'>
                    <AccordionButton gap='6' as={Box} pl={0} border='none' borderRadius="lg" overflow="hidden" cursor="pointer">
                        <Box>
                            <Datebox />
                        </Box>
                        <Heading size='md' flex='2'>{session.name}</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p='0'>
                        {session?.tickets?.map((ticket, index) => {
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
