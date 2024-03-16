import React, { useState, useEffect, useRef } from 'react'
import * as Collection from './style';
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner, EventCard, EventSearch } from '@/components';
import { Stack } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from 'next/link';


const mediaSizes = {
    320: { slidesPerView: 1.3, spaceBetween: 10 },
    480: { slidesPerView: 1.3, spaceBetween: 5 },
    640: { slidesPerView: 5, spaceBetween: 30 },
    1366: { slidesPerView: 4, spaceBetween: 20 }
}

export default function CategoryCollection({ data }: any) {
    return (
        <Stack spacing={8}>
            <Banner />
            {
                data.map((category: string, key: string) => (
                    <Collection.Container key={key}>
                        <Collection.Header>
                            <Collection.Title>{category.name} </Collection.Title>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className={`slideNav el-${category.id}-prev `}><FaAngleLeft /></button>
                                <button className={`slideNav el-${category.id}-next`}><FaAngleRight /></button>
                            </div>
                        </Collection.Header>

                        <Swiper
                            className='swiper-container'
                            navigation={{ nextEl: `.el-${category.id}-next`, prevEl: `.el-${category.id}-prev` }}
                            direction="horizontal"
                            spaceBetween={10}
                            slidesPerView={2.3}
                            breakpoints={mediaSizes}
                            freeMode={true}
                        >
                            {category.trips.map((trip, key) => (
                                <SwiperSlide key={key} >
                                    <Link href={'/event/example-event'}>
                                        <>
                                        <EventCard
                                            key={key}
                                            data={trip}
                                            category={category}
                                            image={'https://picsum.photos/id/' + Math.floor(Math.random() * 500) + '/500/350.jpg'}
                                        />
                                        </>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Collection.Container>

                ))
            }
        </Stack>
    )
}