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
    Stack,
    useColorModeValue as mode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { BsQrCodeScan } from 'react-icons/bs';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { IoTicketOutline } from 'react-icons/io5';
import { PurchasesProps, PurchaseTicketProps } from '../types';
import TicketQrCodeModal from './ticket-qrcode-modal';

export default function TicketCard({ purchase }: { purchase: PurchasesProps }) {
    const { isOpen, onToggle } = useDisclosure();
    const [selectedTicket, setSelectedTicket] = useState<PurchaseTicketProps | null>(null);

    const qrCodeModal = useDisclosure();

    return (
        <Box
            borderRadius='lg'
            overflow='hidden'
            w={'100%'}
            p={2}
            border='solid 1px #eee'
        >
            <HStack spacing={4}>
                <Image
                    src={purchase.event_image + '-lg.jpg'}
                    alt='Event'
                    boxSize='120px'
                    objectFit='cover'
                    borderRadius='md'
                    alignSelf={{ base: 'self-start' }}
                />
                <VStack align='start' spacing={1} flex='1'>
                    <Heading size='sm'>{purchase.name}</Heading>
                    <Box fontSize={{ base: 'xs', md: 'sm' }} textTransform={'uppercase'}>
                        <Text color='primary.500' fontWeight='bold'>Pedido: {purchase.order}</Text>
                        <Text>Data da compra: {purchase.order_date}</Text>
                        <Text>Quantidade: <Badge colorScheme='primary' variant='outline'>{purchase.quantity}</Badge></Text>
                    </Box>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>{purchase.event_address}</Text>
                </VStack>
                <IconButton
                    alignSelf={{ base: 'self-start' }}
                    aria-label='expand-ticket'
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={onToggle}
                    colorScheme='primary'
                    variant='ghost'
                />
            </HStack>

            <Collapse in={isOpen}>
                <Divider my={2} />
                <VStack align='start' spacing={2}>
                    <Text fontWeight='bold'>Detalhes dos ingressos:</Text>
                    {
                        purchase.tickets.map(ticket => {
                            return <Box
                                boxShadow='sm'
                                borderWidth='1px'
                                background='primary.20'
                                borderRadius={'xl'}
                                // border='dashed 1px'
                                borderColor='primary.50'
                                alignItems='center'
                                p='4'
                                gap='4'
                                width='100%'
                                display='flex'
                                fontSize={{ base: 'sm', md: 'md' }}
                                justifyContent='space-between'
                            >
                                <Flex alignItems={'center'} gap='4'>
                                    <Box color='primary.300'>
                                        <IoTicketOutline fontSize={24} />
                                    </Box>
                                    <Box>
                                        <Text color='gray.500'>{ticket.name}</Text>
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
                        })
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

