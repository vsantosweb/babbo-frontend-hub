import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  StackDivider,
  useColorModeValue as mode,
  Divider,
  Tag,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from '@/tools'
import Link from 'next/link'
import { useTicket } from '@/hooks'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
  description: string
  quantity: number
}

const OrderSummaryItem = ({ label, quantity, description, value, children }: OrderSummaryItemProps) => {
  return (
    <Flex justify="space-between" fontSize="sm">


      <Box>
        <Heading display={'flex'} gap='2' alignItems={'center'} size={{ base: 'xs', md: 'sm' }}>
          <Tag variant='outline' colorScheme='primary'>{quantity}x</Tag> {label}
        </Heading>
        <Text pt='2' fontSize={{ base: 'xs', md: 'sm' }}>{description}</Text>
      </Box>
      {value ? <Text fontSize={'md'} fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}


export const OrderSummary = ({ cart }: { cart: any }) => {

  if(!cart) return <div>Loading...</div>
  return (

    <Card boxShadow={'none'} border={'solid 1px #eee'} rounded="xl" width="full">
      <CardHeader>
        <Heading size='md'>Detalhes da compra</Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing='8'>
          {cart && cart.tickets.map((ticket, index) => {
            return <OrderSummaryItem
              label={`${ticket.batch} - ${ticket.name}`}
              quantity={ticket.quantity}
              description={ticket.session}
              value={formatPrice(ticket.total)}
            />
          })}


        </Stack>
        <Divider my='8' />
        <Stack spacing='8'>
          <Box>
            <Heading fontSize='md'>Ingressos</Heading>
            <Flex justify="space-between" fontSize="sm">
              <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>Total em ingressos</Text>
              <Text fontWeight="medium">{formatPrice(cart.total_amount_tickets)}</Text>
            </Flex>
          </Box>
          <Stack spacing='2'>
            <Heading fontSize='md'>Taxas</Heading>
            <Flex justify="space-between" fontSize="sm">
              <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>Taxa de serviço</Text>
              <Text fontWeight="medium">{formatPrice(cart.total_tax)}</Text>
            </Flex>
            {/* <Flex justify="space-between" fontSize="sm">
              <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>Taxa de processamento</Text>
              <Text fontWeight="medium">20</Text>
            </Flex> */}
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <Box
          fontSize='xl'
          fontWeight='bold'
          color='primary.500'
          background='primary.50'
          display='flex' w='100%'
          borderWidth='2px'
          borderColor='primary.300'
          p='4'
          borderRadius='xl'
          justifyContent="space-between">
          <span>Total a pagar</span>
          <span>{formatPrice(cart.total_amount)}</span>
        </Box>
      </CardFooter>

    </Card>
  )
}