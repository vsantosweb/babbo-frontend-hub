import Layout from '@/layouts'
import React, { useState } from 'react'

import {
    Box,
    Heading,
    Stack,
} from "@chakra-ui/react";

import { CustomerOrderRepositoryInterface } from '@/interfaces'

import { useEffect } from 'react'
import { Loader } from '@/components';
import container from '@/repository/Services/container';
import TicketList from './components/ticket-list';

const customerOrderService = container.get<CustomerOrderRepositoryInterface>('customer-order')

export default function Purchases() {

    const [purchases, setPurchases] = useState(null);

    useEffect(() => {
        customerOrderService.tickets().then(response => {
            setPurchases(response.data.data)
        })
    }, [])

    if (!purchases) return <Loader />

    return (
        <Layout name='client'>
            <Box className='app-wrapper' mx='auto' my={{ base: 4, md: 'auto' }}>
                <Stack spacing='4'>
                    <Heading fontWeight={'300'}>Meus Ingressos</Heading>
                    <TicketList purchases={purchases} />
                </Stack>
            </Box>
        </Layout>
    )
}
