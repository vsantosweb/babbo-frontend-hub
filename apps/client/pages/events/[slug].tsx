import Layout from '@/layouts';
import { theme } from '@/themes/default';
import { Box, Flex, Heading, Stack, Link } from '@chakra-ui/react';
import { Loader, RelatedEvents } from '@/components';
import { EventProvider } from '@/hooks';
import EventPoster from './components/EventPoster';
import EventInfo from './components/EventInfo';
import EventDetails from './components/EventDetails';
import TicketSaleComponent from './ticket';
import container from '@/container';
import { EventRepositoryInterface } from '@/interfaces';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import moment from 'moment';

const EventMap = dynamic(() => import('./components/EventMap'), {
  ssr: true
});

const eventService = container.get<EventRepositoryInterface>('public');

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const { query } = context;

  const id: string = query?.id as string

  const fetchEventData = await eventService.event(id);
  const eventData = fetchEventData.data;

  if (!eventData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  if (moment() > moment(eventData.end_date)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const fetchRelatedEventsData = await eventService.related(eventData.id);
  const relatedEvents = fetchRelatedEventsData.data;
  // const relatedEvents = {};

  return { props: { eventData, relatedEvents } };

}

function EventShow({ eventData, relatedEvents }: Record<string, any>) {

  // useEffect(() => {
  //   async function redirect() {

  //     console.log('de ucertoooo', eventData)
  //     const response = await fetch(`/api/urlShort?shortID=${event.uuid}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       const originalURL = data.originalURL; // Supondo que a API retorne a URL original
  //       window.location.href = originalURL;
  //     } else {
  //       console.error('URL not found');
  //     }
  //   }

  //   redirect();
  // }, [eventData.uuid]);

  return (
    <Layout
      title={eventData?.name}
      name={'client'}
      description={eventData?.description}
      image={`${eventData?.event_image}-md.jpg`}

    >
      {!eventData ? <Loader /> : <Stack spacing={{ base: 0, md: 6 }}>
        <Flex
          position='relative'
          minHeight='290px'
          height='auto'
        >
          <Box mx={{ base: '-1em' }}
            backgroundImage={{ base: 'none', md: `linear-gradient(#222, rgba(0, 0, 0, 0.8)) ,url(${eventData?.event_image}-lg.jpg) ` }}
            backgroundSize={'2%'}
            backgroundPosition={'center center scroll'}
            // filter="blur(2px)"
            w={'100%'}
            h='290px'
            margin={'auto'}
            position="absolute"
            zIndex={-1}
          />
          <Flex
            mx={'auto'}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={3}
            py={{ base: 0, md: 8 }}
            maxWidth={theme.defaultContainer.width}
            width={'100%'}
          >
            <EventPoster event={eventData} />
            <Stack
              spacing={10}
              p={{ base: '1em', md: '1em' }}
              mt={{ base: 4, md: 0 }}
              justifyContent='space-between'
              flex={1}
              width={'100%'}
            >
              <Stack color={{ md: '#fff' }} spacing={6}>
                <EventDetails event={eventData} />
                <EventInfo event={eventData} />
              </Stack>
              <Box pt='6'>
                <Heading size={'md'}>Detalhes</Heading>
                <Box dangerouslySetInnerHTML={{ __html: eventData.description as string }}></Box>
              </Box>
            </Stack>
          </Flex>
        </Flex>
        
        <Stack p={{ base: '1em', md: '1em' }} spacing={8} m={'auto'} width={'100%'} maxWidth={theme.defaultContainer.width}>
          <Stack spacing={6}>
            
            {/* <Box>
              <strong>Organizador:</strong> <Link href={`/organizer?trackid=${eventData.organizer.organizer_id}`}>{eventData.organizer.organizer_name}</Link>
            </Box> */}
            <Stack width={'100%'}>
              <Heading size={'lg'}>Local do evento</Heading>
              <EventMap event={eventData} />
            </Stack>
          </Stack>
          {relatedEvents === null || relatedEvents.length > 0 && <RelatedEvents title={`Eventos relacionados`} relatedEvents={relatedEvents} />}
        </Stack>
      </Stack>}
    </Layout>
  );
}

export default function Event({ eventData, relatedEvents }: Record<string, any>) {
  return (
    <EventProvider>
      <EventShow eventData={eventData} relatedEvents={relatedEvents} />
    </EventProvider>
  );
}
