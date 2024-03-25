import React from 'react';
import Link from 'next/link';

import * as Styled from './style';
import { CiCalendar, CiClock2, CiLocationOn } from 'react-icons/ci';
import { theme } from '@/themes/default';
import { EventInterface } from '@/types';
import { useEvent } from '@/hooks';

interface Props {
  data?: any;
  category?: any;
  image?: string;
}
export const EventCard = (event: EventInterface) => {
  const { getFormattedDate } = useEvent();

  const event_date = getFormattedDate(event);

  return (
    <Styled.CardEvent title={event.name}>
      <Styled.CardEventImageContainer>
        <Styled.CardEventImage
          alt={event.name}
          src={`${event.event_image}.jpg`}
        />
        event_date
      </Styled.CardEventImageContainer>
      <Styled.CardEventBody>
        <Styled.CardEventDetails>
          <Styled.CardEventDateInfo>
            <Styled.CardEventMutedText style={{ color: theme.colors.primary }}>
              {' '}
              {event_date.partial}{' '}
            </Styled.CardEventMutedText>
          </Styled.CardEventDateInfo>
          <Styled.CardEventTitle>{event.name}</Styled.CardEventTitle>
          <Styled.CardEventMutedText>
            {' '}
            <CiLocationOn /> {event.place_name}
          </Styled.CardEventMutedText>
        </Styled.CardEventDetails>
        <Styled.CardEventInfo></Styled.CardEventInfo>
      </Styled.CardEventBody>

      {/* <Styled.CardEventFooter>
                <Styled.OwnerInfo>
                    <Styled.OwnerImage><img src={'https://i.picsum.photos/id/395/500/350.jpg?hmac=dTiIr52Z88T2mgCLRjX9QcSVtwpiK6_jhlOaduyfyAE'} /></Styled.OwnerImage>
                    <Styled.OwnerName>test</Styled.OwnerName>

                </Styled.OwnerInfo>
            </Styled.CardEventFooter> */}
    </Styled.CardEvent>
  );
};
