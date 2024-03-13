import React from 'react';
import Link from 'next/link'

import * as Styled from './style';
import { CiCalendar, CiClock2, CiLocationOn } from "react-icons/ci";

interface Props {
    data?: any;
    category?: any;
    image?: string
}
export const EventCardFeatured = ({ data, category, image }: Props) => {
    return (
        <Styled.CardEvent>
            <Styled.CardEventImageContainer>
                <Styled.CardEventImage src={'https://images.sympla.com.br/65e6070ed5f5f-lg.png'} />

            </Styled.CardEventImageContainer>
            <Styled.CardEventBody>
                <Styled.CardEventDetails>
                    <Styled.CardEventTitle>Coldplay World Tour</Styled.CardEventTitle>
                    <Styled.CardEventDateInfo>
                        <Styled.CardEventMutedText>
                            <CiCalendar /> <span>18 de Nov</span>
                        </Styled.CardEventMutedText>
                        -
                        <Styled.CardEventMutedText>
                            <CiClock2 /> <span>19h</span>
                        </Styled.CardEventMutedText>
                    </Styled.CardEventDateInfo>

                    <Styled.CardEventMutedText> <CiLocationOn /> Alians Parque</Styled.CardEventMutedText>
                </Styled.CardEventDetails>
                <Styled.CardEventInfo>

                </Styled.CardEventInfo>
            </Styled.CardEventBody>
        </Styled.CardEvent>
    );
}
