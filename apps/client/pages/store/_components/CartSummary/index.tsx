import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
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
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="4" width="full">
      <Heading size="md">Detalhes do pedido</Heading>

      <Stack spacing="6">
        <CartSummaryItem label="Subtotal" value={formatPrice(totalAmount)} />
        {/* <OrderSummaryItem label="Shipping + Tax">
            <Link href="#" textDecor="underline">
              Calculate shipping
            </Link>
          </OrderSummaryItem> */}
        {/* <OrderSummaryItem label="Cupom de desconto">
            <Link href="#" textDecor="underline">
              Adicionar cupom
            </Link>
          </OrderSummaryItem> */}
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
        colorScheme="blue"
        size="lg"
        isLoading={isLoading}
        fontSize="md"
        isDisabled={selectedTickets.length === 0}
        rightIcon={<FaArrowRight />}>
        Pagamento
      </Button>
    </Stack>
  )
}