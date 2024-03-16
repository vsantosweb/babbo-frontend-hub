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
    <Layout title={'home'} name={'client'}>
      {/* <EventSearch/> */}
      <Box mt={8}>
        {/* <Banner /> */}

        <HomeDiscovery dataDiscovery={events} />

      </Box>

    </Layout>

  );
}

export default Index;
