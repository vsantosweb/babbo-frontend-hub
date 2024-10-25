import {
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { CartOrderSummary } from '../CartOrderSummary'
import TicketSelector from '../TicketSelector'
import { TicketProvider } from '../../_hooks/useTicket'

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
          <CartOrderSummary />
        </Flex>
      </Stack>
  </TicketProvider>
)