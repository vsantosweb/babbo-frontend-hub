import React, { use, useEffect, useState } from 'react'
import CreditCardForm from '../_components/Payment/CreditCard'
import Layout from '@/layouts'
import StoreHeader from '../_components/StoreHeader'
import {
  Flex, Input, Stack,
} from '@chakra-ui/react'
import { OrderSummary } from '../_components/OrderSummary'
import PaymentMethodList from '../_components/PaymentMethodList'
import { AuthProvider, CartProvider, TicketProvider, useCart } from '@/hooks'
import container from '@/repository/Services/container'
import { TicketCartType } from '@/types'
import SessionCountdown from '../_components/SessionCountdown'
import { Loader } from '@/components'
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { cardValidatorSchema } from '@/validators';
import * as Yup from 'yup';
import { CustomerOrderRepositoryInterface, CustomerCartRepositoryInterface } from '@/repository'
import PaymentMenssageStatus from '../_components/PaymentMenssageStatus'
import { NextPage } from 'next'
import CartExpiredSession from '../_components/CartExpiredSession'

const customerCartService = container.get<CustomerCartRepositoryInterface>('customer-cart')
const customerOrderService = container.get<CustomerOrderRepositoryInterface>('customer-order')

const validationSchema = Yup.object().shape({ ...cardValidatorSchema });


const PaymentPage: NextPage = () => (
  <CartProvider>
    <CartContext />
  </CartProvider>

)

function CartContext() {

  const [successPaymentStatus, setSuccessPaymentStatus] = useState<boolean | null>(null)

  const paymentForm = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const { cart, cartExpired } = useCart();


  const handlePayment = async (formData: any) => {

    return await customerOrderService.create(formData)
      .then(response => {
        setSuccessPaymentStatus(response.status)
      })
  }

  if (!cart && !cartExpired) return <Loader />

  if (cartExpired) return <Layout title={'Babbo Eventos'} name={'client'}>
    <CartExpiredSession />
  </Layout>

  if (successPaymentStatus) {
    return (
      <Layout title={'Babbo Eventos'} name={'client'}>
        <PaymentMenssageStatus status={'success'} />
      </Layout>
    )
  }


  return (
    <Layout title={'Babbo Eventos'} name={'client'}>
      <CartProvider>
        <Stack className='app-wrapper' spacing='4' mt={4}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            gap={4}
          >
            <Stack flex='1'>
              <FormProvider {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(handlePayment)}>
                  <PaymentMethodList />
                </form>
              </FormProvider>
            </Stack>
            <Flex direction="column" flex="1.5" gap='4'>
              <SessionCountdown/>
              <OrderSummary cart={cart} />
            </Flex>
          </Stack>
        </Stack>
      </CartProvider>
    </Layout>


  )
}

export default PaymentPage;