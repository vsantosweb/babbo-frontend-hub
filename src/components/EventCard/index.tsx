import React from 'react';
import Link from 'next/link'

import * as Styled from './style';
import { CiCalendar, CiClock2, CiLocationOn } from "react-icons/ci";
import { theme } from '@/themes/default';
import { EventInterface } from '@/types';

interface Props {
    data?: any;
    category?: any;
    image?: string
}
export const EventCard = (event: EventInterface) => {
    console.log(event, 'caralho')
    return (
        <Styled.CardEvent>
            <Styled.CardEventImageContainer>
                <Styled.CardEventImage src={`${event.event_image}.jpg`} />
            </Styled.CardEventImageContainer>
            <Styled.CardEventBody>
                <Styled.CardEventDetails>
                    <Styled.CardEventDateInfo>
                        <Styled.CardEventMutedText style={{color: theme.colors.primary}}>
                            <CiCalendar /> <span>18 de Nov</span>
                        </Styled.CardEventMutedText>
                        -
                        <Styled.CardEventMutedText style={{color: theme.colors.primary}}>
                            <CiClock2 /> <span>19h</span>
                        </Styled.CardEventMutedText>
                    </Styled.CardEventDateInfo>
                    <Styled.CardEventTitle>{event.name}</Styled.CardEventTitle>

                    <Styled.CardEventMutedText> <CiLocationOn /> {event.place_name}</Styled.CardEventMutedText>
                </Styled.CardEventDetails>
                <Styled.CardEventInfo>

                </Styled.CardEventInfo>
            </Styled.CardEventBody>

            {/* <Styled.CardEventFooter>
                <Styled.OwnerInfo>
                    <Styled.OwnerImage><img src={'https://i.picsum.photos/id/395/500/350.jpg?hmac=dTiIr52Z88T2mgCLRjX9QcSVtwpiK6_jhlOaduyfyAE'} /></Styled.OwnerImage>
                    <Styled.OwnerName>test</Styled.OwnerName>

                </Styled.OwnerInfo>
            </Styled.CardEventFooter> */}
        </Styled.CardEvent>
    );
}
