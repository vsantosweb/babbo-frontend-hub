import Layout from '@/layouts'
import React, { useState } from 'react'

import {
    Box,
    Button,
    Heading,
    HStack,
    Stack,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";

import { CustomerOrderRepositoryInterface } from '@/interfaces'

import { useEffect } from 'react'
import { Loader, ResultMessage } from '@/components';
import container from '@/container';
import TicketList from '@/client/components/ticket-list';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import TicketCard from '@/client/components/ticket-card';
import { PurchasesProps } from '@/repository/Types/PurchaseType';

const customerOrderService = container.get<CustomerOrderRepositoryInterface>('customer-order')

export default function Purchases() {

    const [orders, setOrders] = useState<Record<string, any>[]>();
    const { isOpen, onToggle } = useDisclosure();

    const router = useRouter();

    useEffect(() => {
        customerOrderService.tickets().then(response => {
            setOrders(response.data.data)
        })
    }, [])

    if (!orders) return <Loader />
    
    return (
        <Layout name='client'>
            <Box className='app-wrapper' mx='auto' my={{ base: 4, md: 'auto' }}>
                <Stack >
                    <Heading px='2' fontWeight={'300'}>Meus ingressos</Heading>
                    {orders.length > 0 ? <>

                        {orders.map((order, index) => {
                            return (
                                <Stack boxShadow='lg' spacing='0' borderRadius='lg' borderWidth='1px'>
                                    <HStack p='4' borderBottomWidth='1px'>
                                        <Heading flex='1' color='gray.600' size='md'>#{order.code}</Heading>
                                        <Button
                                            alignSelf={{ base: 'self-start' }}
                                            aria-label='expand-ticket'
                                            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                            onClick={onToggle}
                                            size='xs'
                                            colorScheme='primary'
                                            variant='ghost'>Ver ingressos</Button>
                                    </HStack>
                                    <VStack  px='4' py='4'>
                                        {order.suborders.map((purchase: PurchasesProps) => (
                                            <TicketCard expanded={isOpen} key={purchase.order} purchase={purchase} />
                                        ))}
                                    </VStack>
                                </Stack>
                            )
                        })}


                    </> : <ResultMessage
                        title={'Você ainda não possui ingressos'}
                        description={'Explore a plataforma e encontre os melhores eventos da sua região.'}
                        action={{ callback: () => router.push('/'), actionText: 'Ir as compras' }}
                    />}

                </Stack>
            </Box>
        </Layout>
    )
}
