import React, { use, useEffect, useState } from 'react'
import CreditCardForm from '../_components/Payment/CreditCard'
import Layout from '@/layouts'
import StoreHeader from '../_components/StoreHeader'
import {
  Flex, Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { OrderSummary } from '../_components/OrderSummary'
import PaymentMethodList from '../_components/PaymentMethodList'
import { AuthProvider, CartProvider, TicketProvider } from '@/hooks'
import Login from '@/components/Login'
import { CustomerCartInterface } from '@/repository/Services/Api/Customer/Interfaces/CustomerCartInterface'
import container from '@/repository/Services/container'
import { GetServerSidePropsContext } from "next/types";


const customerCartService = container.get<CustomerCartInterface>('customer-cart')

// export async function getServerSideProps(context: GetServerSidePropsContext) {

//   const { query } = context;

//   const id: string = query?.uuid as string

//   const cart = await customerCartService.getCart();

//   return {
//     props: {
//       cart: cart.data
//     }
//   };
// }


export default function PaymentPage() {

  const [cart, setCart] = useState<Record<string, any> | null>(null)
  useEffect(() => {
    customerCartService.getCart().then(response => {
      console.log(response.data)
      setCart(response.data.data)
    })
  }, [])

  return (
    <Layout title={'Babbo Eventos'} name={'client'}>
      <AuthProvider middleware='auth:customer' config={{ loginRoute: '/account/login' }}>
        <CartProvider>
          <Stack className='app-wrapper' spacing='4' mt={4}>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'flex-start' }}
              gap={4}
            >
              <Stack flex='1'>
                <PaymentMethodList />
                {/* <CreditCardForm /> */}
              </Stack>
              <Flex direction="column" align="center" flex="1.5">
                <OrderSummary cart={cart} />
              </Flex>
            </Stack>

          </Stack>
        </CartProvider>
      </AuthProvider>


    </Layout>


  )
}
