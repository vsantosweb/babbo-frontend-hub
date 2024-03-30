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

import events from './events.json'
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';


export function Index() {
 
  const router = useRouter();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
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
                <Th>Shakes 🔥</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.data.map((event: any) => (
                  <Tr p={4} key={event.id} _hover={{background: 'gray.100'}} cursor={'pointer'}>
                    <Td pr={0}>
                      <Checkbox />
                    </Td>
                    <Td  onClick={() => router.push(`/events/${event.uuid}`)}>
                      <Flex gap={3} alignItems="center">
                        <Box borderRadius={'100%'} overflow={'hidden'}>
                          <Image objectFit={'cover'} src={`${event.event_image}.jpg`} alt={event.name} boxSize="60px" />
                        </Box>
                        <Stack>
                          <span>{event.name}</span>
                          <Text color='gray.400'>{event.place_name}</Text>
                        </Stack>
                      </Flex>
                    </Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>
                      <Badge >Publicado</Badge>
                    </Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>545</Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>200</Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>80</Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>{moment(event.start_date).format('L')}</Td>
                    <Td onClick={() => router.push(`/events/${event.uuid}`)}>{moment(event.end_date).format('L')}</Td>
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
