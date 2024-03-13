import React from 'react';
import Link from 'next/link'

import * as Styled from './style';
import { CiCalendar, CiClock2, CiLocationOn } from "react-icons/ci";

interface Props {
    data?: any;
    category?: any;
    image?: string
}
export const EventCard = ({ data, category, image }: Props) => {
    return (
        <Styled.CardEvent>
            <Styled.CardEventImageContainer>
                <Styled.CardEventImage src={'https://images.sympla.com.br/65e6070ed5f5f-lg.png'} />
            </Styled.CardEventImageContainer>
            <Styled.CardEventBody>
                <Styled.CardEventDetails>
                    <Styled.CardEventDateInfo>
                        <Styled.CardEventMutedText style={{color: '#e969c0'}}>
                            <CiCalendar /> <span>18 de Nov</span>
                        </Styled.CardEventMutedText>
                        -
                        <Styled.CardEventMutedText style={{color: '#e969c0'}}>
                            <CiClock2 /> <span>19h</span>
                        </Styled.CardEventMutedText>
                    </Styled.CardEventDateInfo>
                    <Styled.CardEventTitle>Coldplay World Tour</Styled.CardEventTitle>

                    <Styled.CardEventMutedText> <CiLocationOn /> Alians Parque</Styled.CardEventMutedText>
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
