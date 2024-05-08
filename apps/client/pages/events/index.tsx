import Layout from '@/layouts';
import { EventProvider, QueryStringProvider, useEvent } from '@/hooks';
import { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import {
  Banner,
  EventCard,
  EventCardFeatured,
  EventFilter,
  GoogleAdSense,
  Loader,
  Navigation,
} from '@/components';
import { HomeDiscovery } from '@/themes/babbo';
import { EventInterface } from '@/types';
import { Box, Flex, Spinner, Stack, Text, useQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _ from 'lodash';

function Search() {
  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState(null);

  // const { toString } = useQueryString();

  const router = useRouter();

  useEffect(() => {
    !_.isEmpty(router.query) ?
      fetchEvents(queryString.stringify(router.query)).then((response: any) =>
        setEvents(response.data)
      ) : fetchEvents().then((response: any) =>
        setEvents(response.data)
      );;

  }, [router.query]);

  return (
    <Layout
      title={'Babbo Eventos'}
      name={'client'}
      keywords={'guia,baladas,shows,roles,festas,party,bares'}
    >
      <Stack spacing={4}>
        <QueryStringProvider >
          <EventFilter />
        </QueryStringProvider>
        {loading ? (
          <Loader text={'Carregando...'} />
        ) : (
          <HomeDiscovery dataDiscovery={events} />
        )}
      </Stack>
    </Layout>
  );
}

export default function EventSearch() {
  return (
    <EventProvider>
      <Search />
    </EventProvider>
  );
}
