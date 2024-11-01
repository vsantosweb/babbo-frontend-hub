import React, { use, useEffect, useState } from 'react'
import CreditCardForm from '../_components/Payment/CreditCard'
import Layout from '@/layouts'
import StoreHeader from '../_components/StoreHeader'
import {
  Flex, Input, Stack,
} from '@chakra-ui/react'
import { OrderSummary } from '../_components/OrderSummary'
import PaymentMethodList from '../_components/PaymentMethodList'
import { AuthProvider, CartProvider, TicketProvider } from '@/hooks'
import { CustomerCartInterface } from '@/repository/Services/Api/Customer/Interfaces/CustomerCartInterface'
import container from '@/repository/Services/container'
import { TicketCartType } from '@/types'
import SessionCountdown from '../_components/SessionCountdown'
import { Loader } from '@/components'
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { cardValidatorSchema } from '@/validators';
import * as Yup from 'yup';
import { CustomerOrderInterface } from '@/repository/Services/Api/Customer/Interfaces/CustomerOrderInterface'
import PaymentMenssageStatus from '../_components/PaymentMenssageStatus'

const customerCartService = container.get<CustomerCartInterface>('customer-cart')
const customerOrderService = container.get<CustomerOrderInterface>('customer-order')

const validationSchema = Yup.object().shape({ ...cardValidatorSchema });

export default function PaymentPage() {

  const [cart, setCart] = useState<TicketCartType | null>(null)
  const [successPaymentStatus, setSuccessPaymentStatus] = useState<boolean | null>(null)

  const paymentForm = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  useEffect(() => {
    customerCartService.getCart().then(response => {
      console.log(response.data)
      setCart(response.data.data)
    })
  }, [])

  const handlePayment = async (formData: any) => {

    return await customerOrderService.create(formData)
      .then(response => {
        setSuccessPaymentStatus(response.status)
      })
  }

  if (!cart) return <Loader />

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
                <SessionCountdown date={cart?.expire_at} />
                <OrderSummary cart={cart} />
              </Flex>
            </Stack>
          </Stack>
        </CartProvider>
    </Layout>


  )
}
