// import { ServiceHeader } from '@/components';
import { useState, useEffect, useRef, Fragment, Suspense } from 'react';
import * as Styles from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner, EventCard, GoogleAdSense, ResultMessage } from '@/components';
import { Box, Button, Divider, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { EventInterface } from '@/types';
import { Col, Container, Row } from 'react-grid-system';
import eventsMock from './discovery.json';
import _ from 'lodash';
import { useEvent } from '@/hooks';

const mediaSizes = {
  320: { slidesPerView: 1.3, spaceBetween: 10 },
  480: { slidesPerView: 1.3, spaceBetween: 5 },
  640: { slidesPerView: 5, spaceBetween: 30 },
  1366: { slidesPerView: 4, spaceBetween: 20 },
};

export function HomeDiscovery({ dataDiscovery }: {
  dataDiscovery: EventInterface[] | null;
}) {
  eventsMock;

  const { loading } = useEvent();

  const renderWithAdSense = (event: EventInterface, index: number) => {
    if (index > 0 && index % 8 === 0) {
      return (
      
          <GridItem  >
            <EventCard {...event} />
          </GridItem>

      );
    } else {
      return (
        <GridItem overflow={'hidden'} key={`${index}-${event.uuid}`}>
          <EventCard {...event} />
        </GridItem>
      );
    }
  };

  // if (dataDiscovery === null) return <></>

  if (dataDiscovery?.length === 0) return <ResultMessage
    title='Nenhum evento encontrado'
  />;

  return (
    <Grid  className='app-wrapper' templateColumns={{
      lg: 'repeat(4, minmax(0, 1fr))',
      md: 'repeat(2, minmax(0, 1fr))',
      sm: 'repeat(1, minmax(0, 1fr))',
    }}
      gap={4}>
      {dataDiscovery?.map((event, index) => renderWithAdSense(event, index))}
    </Grid>
  );
}
