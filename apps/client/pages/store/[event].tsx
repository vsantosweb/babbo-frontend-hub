import React from 'react'
import { Cart } from './_components/Cart'
import Layout from '@/layouts'
import { Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next';
import container from '@/container';
import { StoreEventInterface } from '@/interfaces';
import StoreHeader from './_components/StoreHeader';


const storeEventService = container.get<StoreEventInterface>('store-event-service');


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const response = await storeEventService.eventTickets(query.event as string)

    const trackid: string = query?.trackid as string

    return { props: { data: response.data } };

}

export default function StorePage({ data }: { data: Record<string, any> }) {

    return (
        <Layout title={'Babbo Eventos'} name={'client'}>
            <Stack className='app-wrapper'spacing='6' mt={4}>
                <StoreHeader />
                <Cart event={data} />
            </Stack>
        </Layout>
    )
}
