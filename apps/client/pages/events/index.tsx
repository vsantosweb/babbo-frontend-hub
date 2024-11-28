import Layout from '@/layouts';
import { EventProvider, QueryStringProvider, useEvent } from '@/hooks';
import { useEffect, useState } from 'react';
import {
  EventFilter,
  Loader,
} from '@/components';
import { HomeDiscovery } from '@/themes/babbo';
import { Stack, } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';

function Search() {
  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState(null);

  // const { toString } = useQueryString();

  const router = useRouter();

  useEffect(() => {
    !_.isEmpty(router.query) ?
      fetchEvents(router.query).then((response: any) =>
        setEvents(response.data)
      ) : fetchEvents().then((response: any) =>
        setEvents(response.data)
      );;

  }, [router.query]);

  return (
    <Layout
      title={'Babbo Eventos'}
      name={'client'}
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
