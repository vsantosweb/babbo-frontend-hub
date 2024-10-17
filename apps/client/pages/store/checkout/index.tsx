import React from 'react'
import { Cart } from '../components/Cart'
import Layout from '@/layouts'
import { Box, Button, Link, Stack } from '@chakra-ui/react'
import TicketSelector from '../components/TicketSelector'
import { cartData } from '../components/_data'

export default function index() {
    return (
        <Layout
            title={'Babbo Eventos'}
            name={'client'}
        >
            <Stack mt={4}>
                {cartData.map((item) => (
                    <Cart />
                ))}
                <Button mt={5} as={Link} href='/store/checkout'>Comprar ingressos</Button>
            </Stack>
        </Layout>
    )
}
