import { eventDateFormatter } from "@/helpers";
import { theme } from "@/themes/default";
import { EventInterface } from "@/types";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
                    background={`${theme.colors.primary}26`}
                  >
                    <IoCalendar />
                  </Box>
                  <Flex gap={1} direction={'column'}>
                    <Heading size={'md'}>
                      {eventDateFormatter(event).partial}
                    </Heading>
                    <Text>{eventDateFormatter(event).fully}</Text>
                  </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'}>
                  <Box
                    padding={4}
                    fontSize={'1.4em'}
                    borderRadius={theme.defaultRadius}
                    background={`${theme.colors.primary}26`}
                  >
                    <HiLocationMarker />
                  </Box>

                  <Link
                    target="_blank"
                    href={`https://google.com/maps/dir/${event?.full_address}`}
                  >
                    <Flex gap={1} direction={'column'}>
                      <Heading size={'md'}><Flex alignItems={'center'} gap={2}>{event?.place_name}<FaDirections  /></Flex></Heading>
                      <Text>{event?.full_address}</Text>
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
                        <Heading size={'md'}>Ingressos</Heading>
                        <Text>{event.ticket_partner_name}</Text>
                      </Flex>
                    </Link>
                  </Flex>
                }
                {/* <Box>
                  <Button background='green.500'>Comprar ingressos</Button>
                </Box> */}
              </Stack>
    )
}
