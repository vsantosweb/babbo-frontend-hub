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
import { HomeDiscovery } from '@/themes/babbo/templates';
import { EventInterface } from '@/types';
import { Box, Flex, Spinner, Stack, Text, useQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import _ from 'lodash';

function Explore() {
  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState(null);

  // const { toString } = useQueryString();

  const router = useRouter();

  useEffect(() => {
    !_.isEmpty(router.query) &&
      fetchEvents(queryString.stringify(router.query)).then((response: any) =>
        setEvents(response.data)
      );
  }, [router.query]);

  return (
    <Layout
      title={'Babbo - Encontre bares, baladas, shows e muito mais aqui.'}
      name={'client'}
      description={
        'Babbo encontre baladas, barzinhos, shows, roles, e muito mais.'
      }
      keywords={'guia,baladas,shows,roles,festas,party,bares'}
    >
 
    </Layout>
  );
}

export default function EventExplore() {
  return (
    <EventProvider>
      <Explore />
    </EventProvider>
  );
}
