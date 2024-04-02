import Layout from '@/layouts';
import styled from '@emotion/styled';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  Image,
  Flex,
  Badge,
  Box,
  Stack,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react'

import eventsMock from './events.json'
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import container from '@/container';
import { EventRepositoryInterface } from '@/interfaces';
import { useEffect, useState } from 'react';
import { EventInterface } from '@/types';
import { eventDateFormatter } from '@/helpers';

const eventService = container.get<EventRepositoryInterface>('event-manager')

interface EventStatus {
  [key: string]: {label: string; color: string;};
  published: {label: string; color: string;};
  rejected: {label: string; color: string;};
  pending: {label: string; color: string;};
  canceled: {label: string; color: string;};
}


export function Index() {

  const [events, setEvents] = useState<EventInterface[]>();
  const router = useRouter();

  const eventStatus: EventStatus = {
    published: { label: 'Publicado', color: 'green.500' },
    rejected: { label: 'Rejeitado', color: 'red.500' },
    pending: { label: 'Publicado', color: 'yellow.500' },
    canceled: { label: 'Cancelado', color: 'gray.300' },
  }


  useEffect(() => {
    eventService.events({limit: '50'}).then(response => {
      setEvents(response.data);
    })
  }, [])

  return (
    <Layout name="manager">
      <Stack spacing={8}>
        <Heading size={'lg'}>Meus eventos</Heading>
        <TableContainer>
          <Table variant="simple" size={'sm'}>
            <TableCaption>
              <Button mr={2}>Preview</Button>
              <Button>Next</Button>
            </TableCaption>
            <Thead>
              <Tr p={3}>
                <Th pr={0}>
                  <Checkbox />
                </Th>
                <Th>Evento</Th>
                <Th>Status</Th>
                <Th>Impressões</Th>
                <Th>Cliques</Th>
                {/* <Th>Shakes 🔥</Th> */}
                <Th>Data</Th>
                <Th>criado em</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events?.map((event: EventInterface) => (
                <Tr p={4} key={event.id} _hover={{ background: 'gray.100' }} cursor={'pointer'}>
                  <Td pr={0}>
                    <Checkbox />
                  </Td>
                  <Td onClick={() => router.push(`/events/${event.uuid}/details`)}>
                    <Flex gap={3} alignItems="center">
                      <Box borderRadius={'100%'} overflow={'hidden'}>
                        <Image objectFit={'cover'} src={`${event.event_image}-md.jpg`} alt={event.name} boxSize="60px" />
                      </Box>
                      <Stack>
                        <span>{event.name}</span>
                        <Text color='gray.400'>{event.place_name}</Text>
                      </Stack>
                    </Flex>
                  </Td>
                  <Td onClick={() => router.push(`/events/${event.uuid}`)}>
                    <Badge variant={'solid'} background={eventStatus[event.status as string].color}>{event.status}</Badge>
                  </Td>
                  <Td onClick={() => router.push(`/events/${event.uuid}/details`)}>{event.impressions}</Td>
                  <Td onClick={() => router.push(`/events/${event.uuid}/details`)}>{event.clicks}</Td>
                  {/* <Td onClick={() => router.push(`/events/${event.uuid}`)}>80</Td> */}
                  <Td onClick={() => router.push(`/events/${event.uuid}/details`)}>{eventDateFormatter(event).fully}</Td>
                  <Td onClick={() => router.push(`/events/${event.uuid}/details`)}>{moment(event.end_date).format('L')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Layout>
  );
}

export default Index;
