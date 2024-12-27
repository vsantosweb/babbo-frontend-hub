import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  useColorModeValue as mode,
  Divider,
  Tag,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  UseDisclosureProps,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { formatPrice } from '@/tools'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { EventTicketCartType } from '@/types'
import { useCart } from '@/hooks'
import React from 'react'
import { useRouter } from 'next/router'
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
      <Stack >
        <Heading display={'flex'} gap='2' alignItems={'center'} size={{ base: 'xs', md: 'sm' }}>
          <Tag variant='outline' colorScheme='primary'>{quantity}x</Tag>
          <Box as='span' flex='1'>{label}</Box>
          {value ? <Text fontSize={'md'} fontWeight="medium">{value}</Text> : children}
        </Heading>
        <Text fontSize={{ base: 'xs', md: 'sm' }}>{description}</Text>
      </Stack>
    </Flex>
  )
}


export const OrderSummary = ({ cart }: { cart?: EventTicketCartType | null }) => {

  const removeCartAlertControl = useDisclosure();

  if (!cart) return <div>Loading...</div>
  return (

    <Card rounded="xl" width="full">
      <RemoveCartConfirm useDisclosure={removeCartAlertControl} />
      <CardHeader>
        <HStack>
          <Heading flex='1' size='md'>Detalhes da compra</Heading>
          <Button variant='outline' onClick={removeCartAlertControl.onOpen} size={{ base: 'xs', md: 'sm' }}>Limpar carrinho</Button>
        </HStack>
      </CardHeader>

      <CardBody>
        <Stack spacing='8'>

          {cart && cart.tickets.map((ticket, index) => {
            return <OrderSummaryItem
              key={index}
              label={`${ticket.name}`}
              quantity={ticket.quantity}
              description={ticket.description}
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
          fontSize='lg'
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



function RemoveCartConfirm({ useDisclosure }: { useDisclosure: UseDisclosureReturn }) {
  const { isOpen, onOpen, onClose } = useDisclosure
  const { clearCart } = useCart();
  const cancelRef = React.useRef(null)
  const router = useRouter()
  return (
    <AlertDialog
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Abandonar carrinho</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Tem certeza que deseja abandonar o carrinho? Você será redirecionado para a página inicial.</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose} variant='ghost'>Continuar comprando</Button>
          <Button colorScheme='red' onClick={() => {
            clearCart().then(() => router.push(process.env.NEXT_PUBLIC_CLIENT_URL as string))
          }} ml={3}>Limpar carrinho</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}