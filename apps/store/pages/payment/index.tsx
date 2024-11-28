import React, { useState } from 'react'
import Layout from '@/layouts'
import StoreHeader from '@/store/components/StoreHeader'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { OrderSummary } from '@/store/components/OrderSummary'
import PaymentMethodList from '@/store/components/PaymentMethodList'
import { CartProvider, useCart } from '@/hooks'
import container from '@/repository/Services/container'
import SessionCountdown from '@/store/components/SessionCountdown'
import { Loader } from '@/components'
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { cardValidatorSchema } from '@/validators';
import * as Yup from 'yup';
import { CustomerOrderRepositoryInterface, CustomerCartRepositoryInterface } from '@/repository'
import PaymentMenssageStatus from '@/store/components/PaymentMenssageStatus'
import { NextPage } from 'next'
import CartExpiredSession from '@/store/components/CartExpiredSession'

const customerOrderService = container.get<CustomerOrderRepositoryInterface>('customer-order')

const validationSchema = Yup.object().shape({ ...cardValidatorSchema });

const PaymentPage: NextPage = () => (
  <CartContext />

)

function CartContext() {

  const [successPaymentStatus, setSuccessPaymentStatus] = useState<boolean | null>(null)
  // { resolver: yupResolver(validationSchema), mode: 'onChange' }
  const paymentForm = useForm();

  const { cart, cartExpired } = useCart();

  const handlePayment = async (formData: any) => {
    return await customerOrderService.create(formData)
      .then(response => {
        setSuccessPaymentStatus(response.status)
      })
  }
  if (!cart && cartExpired && !successPaymentStatus) {
    return (
      <Layout title={'Babbo Eventos'} name={'client'}>
        <CartExpiredSession />
      </Layout>
    )
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
      <FormProvider {...paymentForm}>
        <form onSubmit={paymentForm.handleSubmit(handlePayment)}>
          <Stack maxWidth='710px' width='100%' m='auto' spacing='4' mt={4}>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              align={{ lg: 'flex-start' }}
              gap={4}
            >
              <Flex direction="column" flex="1.5" gap='4'>
                <SessionCountdown />
                <OrderSummary cart={cart} />
                {
                  cart && cart?.total_amount_tickets > 0 ? <PaymentMethodList /> :
                    <>
                      <input type='hidden' {...paymentForm.register('payment_method')} defaultValue={'for_free'} />
                      <Button type='submit'>Gerar ingressos</Button>
                    </>
                }
              </Flex>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Layout>


  )
}

export default PaymentPage;