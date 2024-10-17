import {
    Box,
    Flex,
    HStack,
    Heading,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { CartItem } from '../CartItem'
  import { CartOrderSummary } from '../CartOrderSummary'
  import { cartData } from '../_data'
  
  export const Cart = () => (
    <Box className='app-wrapper'>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
      >
        <Stack spacing={{ base: '6', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Selecione os ingressos
          </Heading>
  
          <Stack spacing="3">
            {cartData.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )