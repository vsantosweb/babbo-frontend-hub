import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from '../PriceTag'
import { useTicket } from '../../_hooks/useTicket'

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
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

export const CartOrderSummary = () => {

  const { totalAmount } = useTicket();

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="4" width="full">
      <Heading size="md">Detalhes do pedido</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalAmount)} />
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
      <Button as={Link} href='/store/payment' colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Pagamento
      </Button>
    </Stack>
  )
}