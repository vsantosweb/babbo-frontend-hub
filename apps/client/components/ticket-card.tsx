import React, { useState } from 'react'
import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Divider,
    Collapse,
    useDisclosure,
    Badge,
    IconButton,
    Flex,
    Heading,
    useColorModeValue as mode,
    Button,
    Stack,
    Alert,
} from '@chakra-ui/react';
import { BsQrCodeScan } from 'react-icons/bs';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { IoTicketOutline } from 'react-icons/io5';
import { PurchasesProps, PurchaseTicketProps } from '@/types';
import TicketQrCodeModal from './ticket-qrcode-modal';
import { formatPrice } from '@/tools';

export default function TicketCard({ purchase, expanded }: { purchase: PurchasesProps, expanded: boolean }) {
    const { isOpen, onToggle } = useDisclosure();
    const [selectedTicket, setSelectedTicket] = useState<PurchaseTicketProps | null>(null);

    const qrCodeModal = useDisclosure();
    console.log(purchase, 'purchase')
    return (
        <Box
            borderRadius='lg'
            overflow='hidden'
            w={'100%'}
        >
            <HStack spacing={4}>
                <Image
                    src={`${purchase.event_image}-xs.jpg`}
                    alt='Event'
                    boxShadow='lg'
                    boxSize='120px'
                    objectFit='cover'
                    borderRadius='md'
                    alignSelf={{ base: 'self-start' }}
                />
                <VStack align='start' spacing={1} flex='1'>
                    <Heading size='md'>{purchase.name}</Heading>
                    <Stack fontSize={{ base: 'xs', md: 'sm' }} >
                        <Heading size='md' fontWeight='medium'>{purchase.event_name}</Heading>
                        <Text color='gray.500' fontSize={{ base: 'xs', md: 'sm' }}>{purchase.event_address}</Text>
                        <Text>Quantidade <Badge borderRadius='md' colorScheme='primary' variant='outline'> {purchase.quantity}</Badge></Text>
                        <Box><Button size='xs' textTransform='uppercase' variant='ghost'>Cancelar compra</Button></Box>
                    </Stack>
                </VStack>

            </HStack>

            <Collapse in={expanded}>
                <Divider my={2} />
                <VStack align='start' spacing={2}>
        
                    {
                     purchase.items.length > 0 ?   purchase.items.map(ticket => {
                            return <>
                                <Box
                                    boxShadow='sm'
                                    borderWidth='1px'
                                    background='primary.20'
                                    borderRadius={'xl'}
                                    alignItems='center'
                                    py='2'
                                    px='4'
                                    gap='4'
                                    width='100%'
                                    display='flex'
                                    justifyContent='space-between'
                                >
                                    <Flex alignItems={'center'} gap='4'>
                                        <Box color='primary.300'>
                                            <IoTicketOutline fontSize={24} />
                                        </Box>
                                        <Box>
                                            <Text color='gray.500'>{ticket.name} - <strong>{formatPrice(ticket.total_amount)}</strong></Text>
                                            <Text fontWeight='bold'>{ticket.batch}</Text>
                                        </Box>
                                    </Flex>
                                    <IconButton
                                        variant='ghost'
                                        colorScheme='primary'
                                        icon={<BsQrCodeScan />}
                                        aria-label='qr-scan'
                                        onClick={() => setSelectedTicket(ticket)}
                                    />
                                </Box>
                            </>
                        }): <Alert status='warning'>Seu pedido está sendo processado. Seus ingressos vão aparecer aqui.</Alert>
                    }

                </VStack>

            </Collapse>

            {selectedTicket && <TicketQrCodeModal
                setSelectedTicket={setSelectedTicket}
                ticket={selectedTicket}
            />}

        </Box>
    );
}

