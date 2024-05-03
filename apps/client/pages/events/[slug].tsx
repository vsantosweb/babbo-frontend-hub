import Layout from '@/layouts';
import { theme } from '@/themes/default';
import { Box, Flex, Heading, Stack, Text, Button, Link } from '@chakra-ui/react';
import { IoCalendar } from 'react-icons/io5';
import { HiLocationMarker } from 'react-icons/hi';
import { FaShareAlt } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import { Loader, RelatedEvents, Sharebutton, TruncateText } from '@/components';
import * as Styled from './styles';
import { EventProvider, useEvent } from '@/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventInterface } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import EventPoster from './components/EventPoster';
import EventInfo from './components/EventInfo';
import EventDetails from './components/EventDetails';
import TicketSaleComponent from './ticket';

function EventShow() {
  const { fetchEvent, fetchRelatedEvents, getFormattedDate } = useEvent();
  const router = useRouter();
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventInterface[] | null>(null);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      fetchEvent(id as string).then((response: any) => {
        setEvent(response.data);
        fetchRelatedEvents(response.data?.id).then((response: any) =>
          setRelatedEvents(response.data)
        );
      });
    }
  }, [router]);
  
  return (
    <Layout
      title={event?.name}
      name={'client'}
      description={event?.description}
      image={`${event?.event_image}-md.jpg`}

    >
      {!event ? <Loader /> : <Stack spacing={10}>
        <Flex
          mx={{ base: '-1em' }}
          backgroundImage={{ base: 'none', md: `linear-gradient(#350053, rgba(0, 0, 0, 0.8)) ,url(${event?.event_image}-lg.jpg)` }}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
          blur={'4px'}
          color={{ md: '#fff' }}
        >
          <Flex
            mx={'auto'}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={3}
            py={{ base: 0, md: 12 }}
            maxWidth={theme.defaultContainer.width}
            width={'100%'}
          >
            <EventPoster event={event} />
            <Stack
              spacing={6}
              p={{ base: '1em', md: '1em' }}
              mt={{ base: 4, md: 0 }}
              flex={1}
              width={'100%'}
            >
              <EventDetails event={event} />
              <EventInfo event={event} />
            </Stack>
          </Flex>
        </Flex>
        <Stack spacing={12} m={'auto'} width={'100%'} maxWidth={theme.defaultContainer.width}>
          <Stack spacing={6}>
            <Heading size={'md'}>Detalhes</Heading>
            {/* <TruncateText text={event.description || ''} limit={50} /> */}
            <Box dangerouslySetInnerHTML={{ __html: event.description as string }}></Box>
            <TicketSaleComponent />
            <Box>
              <strong>Organizador:</strong> <Link href={`/organizer?trackid=${event.organizer.organizer_id}`}>{event.organizer.organizer_name}</Link>
            </Box>
          </Stack>
          {relatedEvents === null || relatedEvents.length > 0 && <RelatedEvents relatedEvents={relatedEvents} />}
        </Stack>
      </Stack>}
    </Layout>
  );
}

export default function Event() {
  return (
    <EventProvider>
      <EventShow />
    </EventProvider>
  );
}
