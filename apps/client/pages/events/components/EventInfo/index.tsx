import { eventDateFormatter } from "@/helpers";
import { theme } from "@/themes/default";
import { EventInterface } from "@/types";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { CiRoute } from "react-icons/ci";
import { HiLocationMarker } from "react-icons/hi";
import { FaDirections, FaTicketAlt } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";

export default function EventInfo({ event }: { event: EventInterface }) {
  return (
    <Stack spacing={4}>
      <Flex gap={4} alignItems={'center'}>
        <Box
          padding={4}
          fontSize={'1.4em'}
          borderRadius={theme.defaultRadius}
          background={`#fff`}
          border={'solid 1px #ddd'}
          color={theme.colors.primary}

        >
          <IoCalendar />
        </Box>
        <Flex gap={1} direction={'column'}>
          <Heading size={'sm'}>
            {eventDateFormatter(event).fully}
          </Heading>

        </Flex>
      </Flex>
      <Flex gap={4} alignItems={'center'}>
        <Box
          padding={4}
          fontSize={'1.4em'}
          borderRadius={theme.defaultRadius}
          background={`#fff`}
          border={'solid 1px #ddd'}
          color={theme.colors.primary}
        >
          <HiLocationMarker />
        </Box>

        <Link
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&destination=${event?.full_address}`}
        >
          <Flex gap={1} direction={'column'}>
            <Text>{event?.full_address}</Text>
            <span><Button size={'xs'} leftIcon={<FaDirections />}>Ver rotas</Button></span>
          </Flex>
        </Link>
      </Flex>
      {
        event?.has_external_ticket && <Flex gap={4} alignItems={'center'}>
          <Box
            padding={4}
            fontSize={'1.4em'}
            borderRadius={theme.defaultRadius}
            background={`${theme.colors.primary}26`}
          >
            <FaTicketAlt />
          </Box>
          <Link
            target="_blank"
            href={event?.ticket_partner_url as string}
          >
            <Flex gap={1} direction={'column'}>
              <Heading size={'sm'}>Ingressos</Heading>
              <Text>{event.ticket_partner_name}</Text>
            </Flex>
          </Link>
        </Flex>
      }
      <Box textAlign={{base: 'center', md: 'left'}} mt={4}>
        <Button as={Link} href={`/store/${event.uuid}`} size={'lg'}>Comprar ingressos</Button>
      </Box>
    </Stack>
  )
}
