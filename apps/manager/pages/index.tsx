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
  Spinner,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
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
import { ResultMessage } from '@/components';
import { Search2Icon } from '@chakra-ui/icons';
import { EventProvider, useAlert, useEvent } from '@/hooks';
import { useForm } from 'react-hook-form';
import { theme } from '@/themes/default';
import Datebox from '@/components/Datebox';

const eventService = container.get<EventRepositoryInterface>('customer-event')

interface EventStatus {
  [key: string]: { label: string; color: string; };
  published: { label: string; color: string; };
  rejected: { label: string; color: string; };
  pending: { label: string; color: string; };
  canceled: { label: string; color: string; };
}

export default function Index() {
  return <EventProvider><Events /></EventProvider>
}

function Events() {

  const PAGE_LIMIT = '10';

  const { fetchSearch, setEvent } = useEvent();
  const [search, setSearch] = useState<Record<string, string | number>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [events, setEvents] = useState<EventInterface[]>();
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const { AlertMessage } = useAlert();

  const eventStatus: EventStatus = {
    published: { label: 'Publicado', color: 'gray.100' },
    rejected: { label: 'Rejeitado', color: 'gray.100' },
    pending: { label: 'Publicado', color: 'gray.100' },
    canceled: { label: 'Cancelado', color: 'gray.100' },
  }

  const handleSearch = async (formData: Record<string, any>) => {
    setSearch(formData)
  }
  useEffect(() => {
    setLoading(true)
    eventService.events({ limit: PAGE_LIMIT, ...search }).then(response => {
      setEvents(response.data);
      setLoading(false)

    })
  }, [search])

  if (events === null) return <></>

  return (
    <Layout name='manager' title='Meus Eventos'>
      <Stack spacing='4'>
        <Stack spacing='2'>
          <HStack>
            <Heading size='lg' flex='1'>Meus eventos</Heading>
            <Button as={Link} href='/events/create' size='sm'>Criar evento</Button>
          </HStack>
          <Text>Aqui você encontra a lista de todos os seus eventos cadastrados</Text>
        </Stack>
        <Flex p='2' gap='2' bg='gray.50'>
          <Stack flex='1'>
            <form onSubmit={handleSubmit(handleSearch)}>
              <InputGroup>
                <InputRightElement>
                  <IconButton type='submit'
                    isLoading={loading}
                    aria-label='event-search'
                    variant={'none'}
                    icon={<Search2Icon
                      color='gray.300'
                    />} />
                </InputRightElement>
                <Input bg='white' 
                {...register('name', 
                { onChange: e => e.target.value.length <= 0 && handleSearch({ name: e.target.value }) })} 
                placeholder='Pesquise o nome do evento...' 
                />
              </InputGroup>
            </form>
          </Stack>
          {/* <Box>
            <Select>
              <option>Passados</option>
              <option>Proximos</option>
            </Select>
          </Box> */}
        </Flex>
        <AlertMessage />
        {events?.length === 0 ? <ResultMessage
          title={'Você ainda não possui eventos'}
          description={'Comece a ciar seu primeiro evento e divulgue para todo seu público.'}
          action={{ callback: () => router.push('/events/create'), actionText: 'Criar novo evento' }}
        /> :
          <Stack spacing={8} h={'100%'} flex={1} >
            {events ? <TableContainer width={'100%'}>
              <Table>
                {/* <TableCaption>
                  <Button mr={2}>Preview</Button>
                  <Button>Next</Button>
                </TableCaption> */}
                <Thead>
                  <Tr >
                    <Th width='80px'>Data</Th>
                    <Th width='100%'>Evento</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events?.map((event: EventInterface) => (
                    <Tr onClick={() => router.push(`/events/${event.uuid}`)} key={event.id} _hover={{ background: useColorModeValue('gray.50', 'black.800') }} cursor={'pointer'}>
                      <Td p='0' >
                        <Datebox date={event.start_date} />
                      </Td>
                      <Td p='2' >
                        <Flex gap={4} alignItems='center'>
                          <Box borderRadius={'10px'} overflow={'hidden'}>
                            <Image objectFit={'cover'} src={`${event.event_image}-md.jpg`} alt={event.name} boxSize="70px" />
                          </Box>
                          <Stack spacing='0'>
                            <Heading size={'sm'}>{event.name}</Heading>
                            <Text fontSize='sm' color='gray.400'>{event.place_name}</Text>
                          </Stack>
                        </Flex>
                      </Td>
                      <Td >
                        <Badge size={'sm'}>{eventStatus[event.status as string].label}</Badge>
                      </Td>
                      <Td >
                        <Button size='sm' variant={'outline'}>Gerenciar</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer> : <Spinner />}


          </Stack>
        }
      </Stack>
    </Layout>

  );
}
