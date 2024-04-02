import { useEvent } from '@/hooks';
import { EventInterface } from '@/types';
import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Stack, Switch, Text } from '@chakra-ui/react';
import { FaMarker } from 'react-icons/fa';
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import { eventDateFormatter } from '@/helpers';
import Link from 'next/link';

const EventDetails = ({ event }: { event?: EventInterface }) => {


  // Supondo que você tenha os detalhes do evento disponíveis, como nome, data, local, etc.
  const eventDetails = {
    name: 'Nome do Evento',
    date: '28 de Março de 2024',
    location: 'Bar São Paulo, São Paulo'
    // Adicione mais detalhes do evento conforme necessário
  };

  return (
    <HStack>
      <Stack spacing={3}>
        <Heading size={'lg'} >{event?.name}</Heading>
        <HStack spacing={6}>
          <Text>
            <HStack>
              <HiLocationMarker /> <span>{event?.place_name}</span>
            </HStack>
          </Text>
          <Text>
            <HStack>
              <HiCalendar /> <span>{event && eventDateFormatter(event).fully}</span>
            </HStack>
          </Text>
        </HStack>
      </Stack>
      <Flex justifyContent={'flex-end'} flex={1}>
        <HStack spacing={3}>
          <Button as={Link} variant={'outline'} href={`/events/${event?.uuid}/edit`} size={'sm'}>Editar</Button>
          <Button colorScheme='red' size={'sm'}>Excluir</Button>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default EventDetails;
