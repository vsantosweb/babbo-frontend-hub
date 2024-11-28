import React from 'react'
import { Cart } from '@/store/components/Cart'
import Layout from '@/layouts'
import { Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next';
import container from '@/container';
import { StoreRepositoryInterface } from '@/interfaces';
import StoreHeader from '@/store/components/StoreHeader';
import { EventInterface } from '@/types';

const storeEventService = container.get<StoreRepositoryInterface>('store-event-service');

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const response = await storeEventService.eventTickets(query.event as string)

    return { props: { data: response.data } };

}

export default function StorePage({ data }: { data: EventInterface }) {

    return (
        <Layout title={'Babbo Eventos'} name={'client'}>
            <Stack className='app-wrapper' spacing='6' mt={4}>
                <StoreHeader event={data} />
                <Cart event={data} />
            </Stack>
        </Layout>

    )
}
