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
import Datebox from "../Datebox";
import { useTicket } from "@/hooks";
import { SessionType } from "@/repository/Types/TicketType";


export default function TicketSelector({ sessions }: { sessions: SessionType[] }) {

    const { handleTicket } = useTicket();

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
                        <Accordion reduceMotion allowToggle>
                            {session.ticket_batches.map((batch, index) => <AccordionItem key={index} borderBottom={session.ticket_batches.length === index + 1 ? 'none' : ''}>
                                <AccordionButton p={4}>
                                    <Box as='span' fontWeight='bold' flex='1' textAlign='left'>{batch.name}</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel p={0}>
                                    {batch.tickets.map((ticket, index) => <TicketCard onChange={handleTicket} key={index} ticket={ticket} />)}
                                </AccordionPanel>
                            </AccordionItem>)}
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
                )}
            </Accordion>
        </Stack>
    )
}
