import { eventDateFormatter } from "@/helpers";
import { theme } from "@/themes/default";
import { EventInterface } from "@/types";
import { Box, Button, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import { FaDirections, FaTicketAlt } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { CopyLinkButton } from "@/components";

export default function EventInfo({ event }: { event: EventInterface }) {
  return (
    <Stack spacing={4}>
      <Flex gap={4} alignItems={'center'}>
        <IoCalendar fontSize={'1.4rem'} />
        <Flex gap={1} direction={'column'}>
          <Text size={'sm'}>
            {eventDateFormatter(event).fully}
          </Text>
        </Flex>
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <FaDirections fontSize='1.6rem' />
        <Link
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&destination=${event?.full_address}`}
        >
          <Flex gap='2' alignItems='center'>
            <Text textDecoration='underline'>{event?.full_address}</Text>
          </Flex>
        </Link>
       
      </Flex>
      {event.available_tickets && <Box

        >
          <Button
            shadow={'xl'}
            as={Link}
            fontWeight='bold'
            href={`${process.env.NEXT_PUBLIC_STORE_URL}/${event.uuid}`}
          >COMPRAR INGRESSOS</Button>
        </Box>}
    </Stack>
  )
}
