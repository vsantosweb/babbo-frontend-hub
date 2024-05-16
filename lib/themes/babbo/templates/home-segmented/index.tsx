// import { ServiceHeader } from '@/components';
import { useState, useEffect, useRef } from 'react';
import * as Styles from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner, EventCard, EventSearch, SliderEvents } from '@/components';
import { Heading, Stack } from '@chakra-ui/react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { EventInterface } from '@/types';

const mediaSizes = {
  320: { slidesPerView: 1.3, spaceBetween: 10 },
  480: { slidesPerView: 1.3, spaceBetween: 5 },
  640: { slidesPerView: 5, spaceBetween: 30 },
  1366: { slidesPerView: 4, spaceBetween: 20 },
};

export function HomeSegmented({ showcase }: { showcase: any }) {
  return (
    <div className='app-wrapper'>

      {
        showcase?.hot_events.length > 0 ?
          <SliderEvents title={'Eventos em alta 🔥'} events={showcase?.hot_events} /> :
          <Heading textAlign={'center'} size={'md'}>Sem eventos para exibir </Heading>
      }

      {/* <SliderEvents title={'Eventos em destaque 💎'} events={showcase?.featured_events} /> */}
      {
        showcase?.week_events.length > 0 ?
          <SliderEvents title={'Eventos da semana'} events={showcase?.week_events} /> :
          <Heading textAlign={'center'} size={'md'}>Sem eventos para exibir </Heading>
      }
    </div>
  );
}
