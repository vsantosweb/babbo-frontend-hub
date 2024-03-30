import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Stack, Switch, Text } from '@chakra-ui/react';
import { FaMarker } from 'react-icons/fa';
import { HiLocationMarker, HiCalendar } from "react-icons/hi";

const EventDetails = () => {
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
        <Heading size={'lg'} >Tardezinha com léo</Heading>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='email-alerts' mb='0'> Pausar evento </FormLabel>
          <Switch id='email-alerts' />
        </FormControl>
        <HStack spacing={6}>
          <Text>
            <HStack>
              <HiLocationMarker /> <span>Bar São Paulo</span>
            </HStack>
          </Text>
          <Text>
            <HStack>
              <HiCalendar /> <span>Domingo, 01/03/2020, 11h – Terça, 03/03/2020, 11h</span>
            </HStack>
          </Text>
        </HStack>
      </Stack>
      <Flex justifyContent={'flex-end'} flex={1}>
        <HStack>
          <Button size={'sm'}>Editar</Button>
          <Button colorScheme='gray' size={'sm'}>Excluir</Button>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default EventDetails;
