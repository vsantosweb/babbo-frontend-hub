import { Box, Text, HStack, IconButton, Badge } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { EventTicketCartItemType, EventTicketType } from '@/types';
import { useEvent, useTicket } from '@/hooks';
import { useEffect } from 'react';
import { formatPrice } from '@/tools';

type TickerCardProps = {
    ticket: EventTicketCartItemType,
    onChange: (ticket: EventTicketCartItemType, action: 'add' | 'remove') => any
    disableIncrement: boolean
}

const TicketCard = ({ ticket, onChange, disableIncrement }: TickerCardProps) => {

    return (
        <Box
            alignItems='center'
            justifyContent='space-between'
            p='4'
            transition='0.3s'
            display='flex'
        >
            <Box>
                <Text color='gray.500'>{ticket.name}</Text>
                <Text fontWeight='bold' >{formatPrice(ticket.unit_price)}</Text>
            </Box>
            {!ticket.sold_out ? <HStack spacing='4'>
                <IconButton
                    variant={'outline'}
                    aria-label='decrement'
                    icon={<MinusIcon />}
                    onClick={() => onChange(ticket, 'remove')}
                    isDisabled={ticket.quantity <= 0}
                />
                <Text>{ticket.quantity}</Text>
                <IconButton
                    onClick={() => onChange(ticket, 'add')}
                    variant={'outline'}
                    disabled={disableIncrement}
                    aria-label='increment'
                    icon={<AddIcon />}
                />
            </HStack>: <Badge>Esgotado</Badge>}
            
        </Box>
    )
};

export default TicketCard;
