import Layout from '@/layouts'
import React, { useState } from 'react'

import {
    Box,
    Heading,
    Stack,
} from "@chakra-ui/react";

import { CustomerOrderRepositoryInterface } from '@/interfaces'

import { useEffect } from 'react'
import { Loader, ResultMessage } from '@/components';
import container from '@/container';
import TicketList from '@/client/components/ticket-list';
import { useRouter } from 'next/router';

const customerOrderService = container.get<CustomerOrderRepositoryInterface>('customer-order')

export default function Purchases() {

    const [orders, setOrders] = useState<Record<string, any>[]>();

    const router = useRouter();

    useEffect(() => {
        customerOrderService.tickets().then(response => {
            setOrders(response.data.data)
        })
    }, [])

    console.log(orders, 'purchasespurchases')
    if (!orders) return <Loader />
    return (
        <Layout name='client'>
            <Box py='8' className='app-wrapper' mx='auto' my={{ base: 4, md: 'auto' }}>
                <Stack spacing='4'>
                    <Heading fontWeight={'300'}>Meus ingressos</Heading>
                    {orders.length > 0 ? <>

                        {orders.map((order, index) => {
                            return (
                                <Stack boxShadow='lg' p='4' borderRadius='lg' borderWidth='1px'>
                                    <Heading color='gray.600' size='md'>#{order.code}</Heading>
                                    <TicketList key={index} purchases={order?.suborders} />
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
