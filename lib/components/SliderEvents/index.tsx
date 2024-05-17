// import { ServiceHeader } from '@/components';
import { useState, useEffect, useRef, ReactNode } from 'react';
import * as Styles from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Banner, EventCard, EventSearch } from '@/components';
import { Heading, Stack } from '@chakra-ui/react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';
import { EventInterface } from '@/types';

const mediaSizes = {
    320: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 5 },
    640: { slidesPerView: 5, spaceBetween: 30 },
    1366: { slidesPerView: 5, spaceBetween: 20 },
};

export function SliderEvents({ events, title }: { events: EventInterface[], title?: string }) {

    const slug = title && title.replace(/\s/g, '')

    return (
        <Stack spacing={8}>
            <Styles.Container>
                <Styles.Header>
                    <Heading fontWeight={'300'} size={'lg'}>{title}</Heading>
                    {events.length > 5 && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className={`slideNav el--prev-${slug}`}>
                            <FaAngleLeft />
                        </button>
                        <button className={`slideNav el--next-${slug}`}>
                            <FaAngleRight />
                        </button>
                    </div>}
                </Styles.Header>

                <Swiper
                    className="swiper-container"
                    navigation={{ nextEl: `.el--next-${slug}`, prevEl: `.el--prev-${slug}` }}
                    direction="horizontal"
                    spaceBetween={10}
                    slidesPerView={2.3}
                    breakpoints={mediaSizes}
                    freeMode={true}
                >
                    {events?.map((event, key) => (
                        <SwiperSlide key={key}>
                            <EventCard {...event} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Styles.Container>
        </Stack>
    );
}
