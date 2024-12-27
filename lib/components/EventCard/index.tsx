import React from 'react';
import Link from 'next/link';

import * as Styled from './style';
import { CiLocationOn } from 'react-icons/ci';
import { theme } from '@/themes/default';
import { EventInterface } from '@/types';
import { useEvent, useEventShare } from '@/hooks';
import { LuSend } from "react-icons/lu";
import { Box, Flex, Heading, IconButton, Image, Skeleton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { EventRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import container from '@/container';
import { eventDateFormatter } from '@/helpers';
import { TruncateText } from '../TruncateText';
const eventService = container.get<PublicRepositoryInterface>('public');

export const EventCard = (event: EventInterface) => {

  const { handleShareClick } = useEventShare();
  const event_date = eventDateFormatter(event);

  const handleShareInteraction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    e.stopPropagation();
    console.log(event, 'eventeventeventeventevent')
    handleShareClick({
      title: event?.name,
      // text: event?.description,
      url: `/events/${event.slug}?id=${event.uuid}`,
      id: event.uuid
    })
  }

  const handleClickInteraction = () => {

    eventService.eventInteraction('click', event.uuid as string)
  }

  return (
    event ? <Link
      onClick={handleClickInteraction}
      href={{
        pathname: `/events/${event.slug}`,
        query: { id: event.uuid },
      }}
    >
      <Box
        maxW="sm"
        minHeight='400px'
        borderRadius="lg"
        overflow="hidden"
        shadow='2xl'

        // bg="black.800" // cor de fundo estilo Netflix
      >
        {/* Imagem com bordas arredondadas */}
        <Image
          src={`${event.event_image}-md.jpg`}
          alt={event.name}
          borderRadius='2xl'
          width="100%"
          height="360px"
          objectFit="cover"

          mb={4}
        />

        {/* Informações do evento */}
        <Stack px='1' spacing={1}>
          <Heading size='sm' isTruncated  fontWeight="bold">{event.name}</Heading>
          <Text fontSize="sm" fontWeight={'bold'} color='primary.400'> {eventDateFormatter(event).partial}</Text>
          <Text fontSize="sm">{event.place_name}</Text>
        </Stack>
      </Box>
    </Link>
      : <CardSkeleton />
  );
};


const CardSkeleton = () => {
  return (
    <Link href="#" onClick={(e) => e.preventDefault()}>
      {/* Este Link é apenas para manter a mesma estrutura do seu código, substitua-o pela sua biblioteca de roteamento real */}
      <Box borderRadius="lg" overflow="hidden" p="4" position="relative">
        <Skeleton height="360px" mb="4" />
        <Flex alignItems="center" position="absolute" top="4" right="4" zIndex="1">
          {/* Botão de compartilhamento simulado */}
        </Flex>
        <Box>
          <Skeleton height="15px" width="80px" mb="2" />
          <Skeleton height="10px" width="120px" mb="2" />
          <Skeleton height="10px" width="80px" />
        </Box>
      </Box>
    </Link>
  );
};