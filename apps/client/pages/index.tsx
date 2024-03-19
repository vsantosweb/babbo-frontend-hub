import Layout from '@/layouts';
import { useEvent } from '@/hooks';
import { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import { Banner, EventCard, EventCardFeatured, EventSearch, Navigation } from '@/components';
import { HomeDiscovery } from '@/themes/babbo/templates';
import { EventInterface } from '@/types';
import { Box } from '@chakra-ui/react';

export function Index() {

  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState(null)
  useEffect(() => {
    fetchEvents().then((resposne) => setEvents(resposne.data))
  }, [])

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
      {/* <EventSearch/> */}
      <Box mt={8}>
        {/* <Banner /> */}
        <Box pb={6}><img src={'https://placehold.co/1280x120'} /> <hr /></Box>
        <HomeDiscovery dataDiscovery={events} />

      </Box>

    </Layout>

  );
}

export default Index;
