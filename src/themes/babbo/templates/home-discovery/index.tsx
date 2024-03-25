// import { ServiceHeader } from '@/components';
import { useState, useEffect, useRef, Fragment, Suspense } from 'react';
import * as Styles from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner, EventCard, ResultMessage } from '@/components';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { EventInterface } from '@/types';
import { Col, Container, Row } from 'react-grid-system';
import eventsMock from './discovery.json';
import _ from 'lodash';

const mediaSizes = {
  320: { slidesPerView: 1.3, spaceBetween: 10 },
  480: { slidesPerView: 1.3, spaceBetween: 5 },
  640: { slidesPerView: 5, spaceBetween: 30 },
  1366: { slidesPerView: 4, spaceBetween: 20 },
};

export function HomeDiscovery({
  dataDiscovery,
}: {
  dataDiscovery: EventInterface[] | null;
}) {
  eventsMock;

  const renderWithAdSense = (event: EventInterface, index: number) => {
    if ((index + 1) % 12 === 0) {
      return (
        <Col key={index} xl={3}>
          <Link
            // target={'_blank'}
            href={{
              pathname: `evento/${event.slug}`,
              query: { id: event.uuid },
            }}
          >
            <EventCard {...event} />
          </Link>
          <Box p={6}>
            <img src={'https://placehold.co/1280x120'} /> <hr />
          </Box>
          {/* <GoogleAdSense adClient='ca-pub-8530046753205274' adSlot={'2752189175'}/> */}

          {/* <AdsBody /> */}
        </Col>
      );
    } else {
      return (
        <Col key={index} xl={3}>
          <Link
            // target={'_blank'}
            href={{
              pathname: `events/${event.slug}`,
              query: { id: event.uuid },
            }}
          >
            <EventCard {...event} />
          </Link>
        </Col>
      );
    }
  };

  if (_.isEmpty(dataDiscovery)) return <ResultMessage />;

  return (
    <div>
      <Container fluid>
        <Row>
          {dataDiscovery?.map((event, index) =>
            renderWithAdSense(event, index)
          )}
        </Row>
      </Container>
    </div>
  );
}
