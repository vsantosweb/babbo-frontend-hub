import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from '../PriceTag'
import { useAuth, useCart, useTicket } from '@/hooks'

type CartSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}


export const CartSummary = () => {

  const { totalAmount, selectedTickets } = useTicket();
  const { addCart, isLoading } = useCart();


  return (
    <Stack
      spacing="4"
      borderWidth="1px"
      rounded="lg"
      padding="4"
      width="full"
      position={{ base: 'fixed', sm: 'relative' }}
      bottom={{ base: '0' }}
      boxShadow={{base: 'xl'}}
      bg={{ base: useColorModeValue('white', 'black.500')}}
    >
      <Heading size={{base: 'sm', sm: 'md'}}>Detalhes do pedido</Heading>

      <Stack spacing="4">
        <CartSummaryItem label="Subtotal" value={formatPrice(totalAmount)} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Flex gap='1' alignItems='center'>
            <Text fontSize="xl" fontWeight="extrabold">{formatPrice(totalAmount)} </Text>
            <Text fontSize="sm">+ taxas</Text>
          </Flex>
        </Flex>
      </Stack>
      <Button
        onClick={() => addCart(selectedTickets)}
        size="lg"
        isLoading={isLoading}
        fontSize="md"
        isDisabled={selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0) <= 0}
        rightIcon={<FaArrowRight />}>
        Pagamento
      </Button>
    </Stack>
  )
}