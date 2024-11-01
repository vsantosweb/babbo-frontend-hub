import Layout from '@/layouts'
import React, { useState } from 'react'


import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Divider,
    Button,
    Collapse,
    useDisclosure,
    Badge,
    IconButton,
    Flex,
    Heading,
    Stack,
    Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { BsQrCodeScan } from "react-icons/bs";
import { LuTicket } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { CustomerOrderInterface } from '@/repository/Services/Api/Customer/Interfaces/CustomerOrderInterface'


import {

    useColorModeValue as mode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Loader } from '@/components';
import container from '@/repository/Services/container';

const customerOrderService = container.get<CustomerOrderInterface>('customer-order')

export function QrCodeModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <></>
    )
}

const TicketCard = ({ ticket }: any) => {
    const { isOpen, onToggle } = useDisclosure();

    const qrCodeModal = useDisclosure();

    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            w={'100%'}
            p={2}
            border='solid 1px #eee'
        >
            <HStack spacing={4}>
                <Image
                    src={ticket.event_image + '-lg.jpg'}
                    alt="Event"
                    boxSize="120px"
                    objectFit="cover"
                    borderRadius="md"
                    alignSelf={{ base: 'self-start' }}
                />
                <VStack align="start" spacing={1} flex="1">
                    <Box fontSize={{ base: 'xs', md: 'sm' }} textTransform={'uppercase'}>
                        <Text color='primary.500' fontWeight="bold">Pedido: {ticket.order}</Text>
                        <Text>Data da compra: {ticket.order_date}</Text>
                        <Text>Quantidade: <Badge colorScheme='primary' variant='outline'>{ticket.quantity}</Badge></Text>
                    </Box>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>{ticket.event_address}</Text>
                </VStack>
                <IconButton
                    alignSelf={{ base: 'self-start' }}
                    aria-label='expand-ticket'
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={onToggle}
                    colorScheme='primary'
                    variant="ghost"
                />
            </HStack>

            <Collapse in={isOpen}>
                <Divider my={2} />
                <VStack align="start" spacing={2}>
                    {/* <Text fontWeight="bold">Detalhes dos ingressos:</Text> */}
                    <Box
                        boxShadow='md'
                        background='gray.50'
                        borderRadius={'xl'}
                        border='dashed 1px'
                        borderColor='primary.100'
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
                                <Text color='gray.500'>{'Promocional'}</Text>
                                <Text fontWeight='bold' > 1 lote - 20/10/2024</Text>
                            </Box>
                        </Flex>
                        <IconButton
                            variant='ghost'
                            colorScheme='primary'
                            icon={<BsQrCodeScan />}
                            aria-label='qr-scan'
                            onClick={qrCodeModal.onOpen}
                        />
                    </Box>
                    {/* {ticket.details.map((detail, index) => (
                        <Box
                            key={index}
                            boxShadow='md'
                            background='gray.50'
                            borderRadius={'xl'}
                            border='dashed 1px'
                            borderColor='primary.100'
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
                                    <Text color='gray.500'>{'Promocional'}</Text>
                                    <Text fontWeight='bold' > 1 lote - 20/10/2024</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='primary'
                                icon={<BsQrCodeScan />}
                                aria-label='qr-scan'
                                onClick={qrCodeModal.onOpen}
                            />
                        </Box>
                    ))} */}

                </VStack>
                <Modal onClose={() => {
                    qrCodeModal.onClose()

                }} isOpen={qrCodeModal.isOpen} isCentered>
                    <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
                    <ModalContent borderRadius='2xl'>
                        <ModalCloseButton />
                        <ModalBody p='8'>
                            <Stack spacing='4'>
                                <Heading fontSize={24} fontWeight={'300'}>Ingresso: Area VIP </Heading>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg' />
                                {/* <Loader /> */}
                            </Stack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Collapse>
        </Box>
    );
};

const TicketList = ({ tickets }: any) => {

    if (tickets) {
        return (
            <VStack spacing={4} >
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.order} ticket={ticket} />
                ))}
            </VStack>
        );
    }

};

// Dados de exemplo
const ticketsData = [
    {
        orderNumber: "12345",
        purchaseDate: "2024-10-31",
        quantity: 2,
        image: "https://event-kraken.s3.amazonaws.com/event/posters/74529/large.jpg",
        address: "Av. dos Eventos, 123, Cidade Exemplo",
        details: ["Ingresso 1: Setor A, Fila 1, Assento 10", "Ingresso 2: Setor A, Fila 1, Assento 11"],
    },
    {
        orderNumber: "67890",
        purchaseDate: "2024-10-25",
        quantity: 1,
        image: "https://event-kraken.s3.amazonaws.com/event/posters/74529/large.jpg",
        address: "R. dos Shows, 456, Cidade Modelo",
        details: ["Ingresso 1: Setor B, Fila 3, Assento 5"],
    },
];


export default function Purchases() {

    const [purchases, setPurchases] = useState(null);


    useEffect(() => {
        customerOrderService.tickets().then(response => {
            setPurchases(response.data.data)
        })
    }, [])

    if (purchases) <Loader />

    return (
        <Layout name='client'>
            <Box className='app-wrapper' mx='auto' my={{ base: 4, md: 'auto' }}>
                <Stack spacing='4'>
                    <Heading fontWeight={'300'}>Meus Ingressos</Heading>
                    <TicketList tickets={purchases} />
                </Stack>
            </Box>
        </Layout>
    )
}
