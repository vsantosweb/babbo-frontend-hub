// import { ServiceHeader } from '@/components';
import { useState, useEffect, useRef } from 'react';
import * as Styles from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner, EventCard, EventSearch } from '@/components';
import { Stack } from '@chakra-ui/react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

const mediaSizes = {
  320: { slidesPerView: 1.3, spaceBetween: 10 },
  480: { slidesPerView: 1.3, spaceBetween: 5 },
  640: { slidesPerView: 5, spaceBetween: 30 },
  1366: { slidesPerView: 4, spaceBetween: 20 },
};

export function HomeDiscovery(dataDiscovery) {
  return (
    <Stack spacing={8}>
      <Banner />
      {dataDiscovery.map((category: any, key: string) => (
        <Styles.Container key={key}>
          <Styles.Header>
            <Styles.Title>{category.name} </Styles.Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className={`slideNav el-${category.id}-prev `}>
                <FaAngleLeft />
              </button>
              <button className={`slideNav el-${category.id}-next`}>
                <FaAngleRight />
              </button>
            </div>
          </Styles.Header>

          <Swiper
            className="swiper-container"
            navigation={{
              nextEl: `.el-${category.id}-next`,
              prevEl: `.el-${category.id}-prev`,
            }}
            direction="horizontal"
            spaceBetween={10}
            slidesPerView={2.3}
            breakpoints={mediaSizes}
            freeMode={true}
          >
            {category.trips.map((trip, key) => (
              <SwiperSlide key={key}>
                <Link href={'/events/example-event'}>
                  <EventCard
                    key={key}
                    data={trip}
                    category={category}
                    image={
                      'https://picsum.photos/id/' +
                      Math.floor(Math.random() * 500) +
                      '/500/350.jpg'
                    }
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Styles.Container>
      ))}
    </Stack>
  );
}
