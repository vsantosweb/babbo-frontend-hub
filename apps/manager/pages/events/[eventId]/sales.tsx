import React, { useEffect, useState } from 'react'

import Layout from '@/layouts';

import { Table, Thead, Tbody, Tr, Th, Td, Box, TableContainer, useColorModeValue, Stack } from "@chakra-ui/react";
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
    <TableContainer shadow='md'>
        <Table width='100%' size='sm'>
            <Thead>
                <Tr>
                    <Th>Comprador</Th>
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
                    <Tr  key={index} _hover={{ background: useColorModeValue('gray.100', 'blackAlpha.500') }}>
                        <Td>
                            <Stack>
                                <strong>{sale.customer_name}</strong>
                                <span>{sale.customer_email}</span>
                            </Stack>
                        </Td>
                        <Td>{sale.order}</Td>
                        <Td>{sale.ticket}</Td>
                        <Td>{sale.status}</Td>
                        <Td>{sale.payment_method}</Td>
                        <Td>{sale.quantity}</Td>
                        <Td>{sale.unit_price.toFixed(2)}</Td>
                        <Td>{sale.total.toFixed(2)}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>
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
            <OrderTable sales={sales} />

        </Layout>
    );
}
