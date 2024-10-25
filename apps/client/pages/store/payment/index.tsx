import React from 'react'
import CreditCardForm from '../_components/Payment/CreditCard'
import Layout from '@/layouts'
import StoreHeader from '../_components/StoreHeader'
import { Flex, Stack } from '@chakra-ui/react'
import { CartOrderSummary } from '../_components/CartOrderSummary'
import { TicketProvider } from '../_hooks/useTicket'
import PaymentMethodList from '../_components/PaymentMethodList'

export default function PaymentPage() {
  return (
    <Layout title={'Babbo Eventos'} name={'client'}>
      <TicketProvider>
        <Stack className='app-wrapper' spacing='6' mt={4}>
          <StoreHeader />
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
          >
            <Stack flex='2'>
              <PaymentMethodList />
            {/* <CreditCardForm /> */}
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
            </Flex>
          </Stack>

        </Stack>
      </TicketProvider>


    </Layout>

  )
}
