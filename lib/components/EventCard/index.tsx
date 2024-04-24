import React from 'react';
import Link from 'next/link';

import * as Styled from './style';
import { CiLocationOn } from 'react-icons/ci';
import { theme } from '@/themes/default';
import { EventInterface } from '@/types';
import { useEvent, useEventShare } from '@/hooks';
import { LuSend } from "react-icons/lu";
import { Box, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { EventRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import container from '@/container';
import { eventDateFormatter } from '@/helpers';
const eventService = container.get<PublicRepositoryInterface>('public');

export const EventCard = (event: EventInterface) => {
  
  const { getFormattedDate } = useEvent();
  const { handleShareClick } = useEventShare();
  const event_date = eventDateFormatter(event);

  const handleShareInteraction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    e.stopPropagation();

    handleShareClick({
      title: event?.name,
      text: event?.description,
      url: `${process.env.NEXT_CLIENT_URL}/events/${event.slug}?id=${event.uuid}`,
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
      <Styled.CardEvent title={event.name}>
        <Styled.CardEventImageContainer>
          <Styled.CardEventImage
            alt={event.name}
            src={`${event.event_image}-lg.jpg`}
          />
          <Flex gap={3} position={'absolute'} right={0} margin={'-3.4em 1em'} zIndex={1}>
            <IconButton
              fontSize={'1.2em'}
              boxShadow={'xl'}
              title={'Compartilhar'}
              variant={'outlined'}
              background={'white'}
              aria-label='event-share'
              icon={<LuSend />}
              onClick={handleShareInteraction}
            />
          </Flex>
        </Styled.CardEventImageContainer>
        <Styled.CardEventBody>
          <Styled.CardEventDetails>
            <Styled.CardEventDateInfo>
              <Styled.CardEventMutedText style={{ color: theme.colors.primary }}>
                {event_date.partial}
              </Styled.CardEventMutedText>
            </Styled.CardEventDateInfo>
            <Styled.CardEventTitle>{event.name}</Styled.CardEventTitle>
            <Styled.CardEventMutedText>
              <CiLocationOn /> {event.place_name}
            </Styled.CardEventMutedText>
          </Styled.CardEventDetails>
          <Styled.CardEventInfo></Styled.CardEventInfo>
        </Styled.CardEventBody>
      </Styled.CardEvent>
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