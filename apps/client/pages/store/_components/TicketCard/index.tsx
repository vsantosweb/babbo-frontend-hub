import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Ticket } from '@/types';

type TickerCardProps = {
    ticket: Ticket,
    onChange: (ticket: Record<string, any>, action: 'add' | 'remove') => any
}

const TicketCard = ({ ticket, onChange }: TickerCardProps) => (
    <Box
        borderBottom='solid 1px #ddd'
        alignItems='center'
        justifyContent='space-between'
        p='4'
        transition='0.3s'
        display='flex'
    >
        <Box>
            <Text color='gray.500'>{ticket.name}</Text>
            <Text fontWeight='bold' >R$ {ticket.price}</Text>
        </Box>
        <HStack spacing='4'>
            <IconButton
                variant={'outline'}
                aria-label='decrement'
                icon={<MinusIcon />}
                onClick={() => onChange(ticket, 'remove')}
                isDisabled={ticket.quantity === 0 || !ticket.quantity}
            />
            <Text>{ticket.quantity || 0}</Text>
            <IconButton
                onClick={() => onChange(ticket, 'add')}
                variant={'outline'}
                aria-label='increment'
                icon={<AddIcon />}
            />
        </HStack>
    </Box>
);

export default TicketCard;
