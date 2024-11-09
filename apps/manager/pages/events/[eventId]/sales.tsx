import React, { useEffect, useState } from 'react'

import DataTable from 'datatables.net-react';

import Layout from '@/layouts';

import { Table, Thead, Tbody, Tr, Th, Td, Box, TableContainer, useColorModeValue } from "@chakra-ui/react";
import { useEvent } from '@/hooks';
import { ApiResponseType } from '@/repository/Types/ApiResponseType';

export type TicketSaleType = {
    id: number
    order: string
    ticket: string
    status: string
    payment_method: string
    quantity: number
    unit_price: number
    total: number
}


const OrderTable = ({ sales }: { sales: TicketSaleType[] }) => (
    <Table w="100%">
        <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>Pedido</Th>
                <Th>Ingresso</Th>
                <Th>Status</Th>
                <Th>Método de pagamento</Th>
                <Th>Quantidade</Th>
                <Th>Valor unitário</Th>
                <Th>Total</Th>
            </Tr>
        </Thead>
        <Tbody>
            {sales?.map((sale, index) => (
                <Tr key={index} _hover={{ background: useColorModeValue('gray.50', 'blackAlpha.500') }}>
                    <Td borderWidth='1px'>{sale.id}</Td>
                    <Td borderWidth='1px'>{sale.order}</Td>
                    <Td borderWidth='1px' width={'30%'}>{sale.ticket}</Td>
                    <Td borderWidth='1px'>{sale.status}</Td>
                    <Td borderWidth='1px'>{sale.payment_method}</Td>
                    <Td borderWidth='1px'>{sale.quantity}</Td>
                    <Td borderWidth='1px'>{sale.unit_price.toFixed(2)}</Td>
                    <Td borderWidth='1px'>{sale.total.toFixed(2)}</Td>
                </Tr>
            ))}
        </Tbody>
    </Table>
);



export default function Sales() {
    const { ticketSales, event } = useEvent();

    const [sales, setSales] = useState([]);

    useEffect(() => {
        ticketSales().then((response: ApiResponseType) => {
            setSales(response?.data)
        })
    }, [event])


    return (

        <Layout name='manager'>
            <Box w={'100%'} overflow={'hidden'}>
            <OrderTable sales={sales} />

            </Box>
        </Layout>
    );
}
