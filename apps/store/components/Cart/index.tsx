import {
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { CartSummary } from '../CartSummary'
import { TicketProvider } from '@/hooks'
import TicketSelector from '../TicketSelector'

export const Cart = ({ event }: { event: Record<string, any> }) => (
  <TicketProvider>
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
    >
      <Stack spacing={{ base: '6', md: '10' }} flex="2">
        <TicketSelector sessions={event.sessions} />
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartSummary />
      </Flex>
    </Stack>
  </TicketProvider>
)