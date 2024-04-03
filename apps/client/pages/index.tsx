import Layout from '@/layouts';
import { EventProvider, useEvent } from '@/hooks';
import { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import {
  Banner,
  EventCard,
  EventCardFeatured,
  EventSearch,
  GoogleAdSense,
  Loader,
  Navigation,
} from '@/components';
import { HomeDiscovery } from '@/themes/babbo/templates';
import { EventInterface } from '@/types';
import { Box, Button } from '@chakra-ui/react';

export function Home() {


  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState<EventInterface[] | null>(null);
  const [limit, setLimit] = useState(8); // Número de eventos a serem buscados por requisição
  const [skip, setSkip] = useState(0); // Número de eventos a serem ignorados (para paginação)
  const [total, setTotal] = useState(0);


  useEffect(() => {
    fetchEvents({ skip: skip, limit: limit }).then((response: any) => {
      setTotal(response.total);

      events ? setEvents([...events, ...response.data]) : setEvents(response.data);

    });
  }, [skip]);

  const loadMore = () => {
    if (events) setSkip(events.length);
  };

  // console.log(events, 'eventseventsevents')
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */
  return (
    <Layout
      title={'Babbo - Encontre bares, baladas, shows e muito mais aqui.'}
      name={'client'}
      description={'Babbo encontre baladas, barzinhos, shows, roles, e muito mais.'}
      keywords={'guia,baladas,shows,roles,festas,party,bares'}
    >
      <Box mt={8}>
        {/* <Banner /> */}
        <Box minHeight={'90px'} height={'auto'} pb={6}>
          {/* <img src={'https://placehold.co/1280x120'} /> <hr /> */}
          <GoogleAdSense adClient='ca-pub-8530046753205274' adSlot={'2752189175'}/>

        </Box>
        <>
          <HomeDiscovery dataDiscovery={events} />
          {total !== events?.length && <Box pb={6} textAlign={'center'}>
            <Button variant={'ghost'} isLoading={loading} onClick={loadMore}>Carregar mais</Button>
          </Box>}
        </>
        {/* {loading ? (<Loader text={'Carregando...'} />) : (<HomeDiscovery loadMore={loadMore} dataDiscovery={events} />)} */}

      </Box>
    </Layout>
  );
}

export default function Index() {
  return (
    <EventProvider>
      <Home />
    </EventProvider>
  );
}
