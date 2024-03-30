import Layout from '@/layouts';
import { theme } from '@/themes/default';
import { Box, Flex, Heading, Stack, Text, Button } from '@chakra-ui/react';
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
import Link from 'next/link';

function EventShow() {
  const { fetchEvent, fetchRelatedEvents, getFormattedDate } = useEvent();
  const router = useRouter();
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventInterface[]>();

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
      title={'home'}
      name={'client'}
      description={event?.description}
      image={`${event?.event_image}-md.jpg`}
    >
      {!event ? <Loader /> : <Stack spacing={8}>
        <Flex

          mx={{ base: '-1em' }}
          mt={{ md: '2em' }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap={3}
        >
          <Box
            borderRadius={{ base: '0', md: 'xl' }}
            position={'relative'}
          >
            {/* Imagem com resolução alta para telas grandes */}
            <Box
              as="img"
              borderRadius={{ base: '0', md: 'xl' }}
              alt={event?.name}
              boxShadow={{
                base: 'none',
                md: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
              }}
              src={`${event?.event_image}-lg.jpg`}
              srcSet={`${event?.event_image}-lg.jpg 1600w,${event?.event_image}-md.jpg 800w,${event?.event_image}-xs.jpg 400w`}
              sizes="(max-width: 767px) 95vw, (max-width: 991px) 90vw, 50vw"
              loading="lazy"
              className="event-banner-img"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '520px',
                objectFit: 'cover',
                overflow: 'hidden',
                display: 'block',
              }}
            />
            <Box
              position={'absolute'}
              right={0}
              textAlign={'center'}
              m={'auto'}
              mt={-15}
              left={0}
            >
              <Sharebutton
                info={{
                  title: event?.name,
                  text: event?.description,
                  url: router.asPath,
                }}
              />
            </Box>
          </Box>
          <Stack
            spacing={6}
            p={{ base: '1em', md: '1em' }}
            mt={{ base: 4, md: 0 }}
            flex={1}
          >
            <Stack spacing={4}>
              <Heading>{event?.name}</Heading>
              <Text color={'gray.500'} size={'xs'}>
                {event?.categories}
              </Text>
              <Flex gap={2} direction={'column'}>
                <Heading size={'md'}>Detalhes</Heading>
                <TruncateText text={event.description || ''} limit={50} />
              </Flex>
            </Stack>
            <Stack spacing={4}>
              <Flex gap={4} alignItems={'center'}>
                <Box
                  padding={4}
                  fontSize={'1.4em'}
                  borderRadius={theme.defaultRadius}
                  color={theme.colors.primary}
                  background={`${theme.colors.primary}26`}
                >
                  <IoCalendar />
                </Box>
                <Flex gap={1} direction={'column'}>
                  <Heading size={'md'}>
                    {getFormattedDate(event).partial}
                  </Heading>
                  <Text>{getFormattedDate(event).fully}</Text>
                </Flex>
              </Flex>
              <Flex gap={4} alignItems={'center'}>
                <Box
                  padding={4}
                  fontSize={'1.4em'}
                  borderRadius={theme.defaultRadius}
                  background={`${theme.colors.primary}26`}
                  color={theme.colors.primary}
                >
                  <HiLocationMarker />
                </Box>

                <Link
                  target="_blank"
                  href={`https://google.com/maps/dir/${event?.full_address}`}
                >
                  <Flex gap={1} direction={'column'}>
                    <Heading size={'md'}>{event?.place_name}</Heading>
                    <Text>{event?.full_address}</Text>
                  </Flex>
                </Link>
              </Flex>
              {
                event.has_tickets && <Flex gap={4} alignItems={'center'}>
                  <Box
                    padding={4}
                    fontSize={'1.4em'}
                    borderRadius={theme.defaultRadius}
                    background={`${theme.colors.primary}26`}
                    color={theme.colors.primary}
                  >
                    <FaTicketAlt />
                  </Box>

                  <Flex gap={1} direction={'column'}>
                    <Heading size={'md'}>Ingressos</Heading>
                    <Text>Ticket 360</Text>
                  </Flex>

                </Flex>
              }
            </Stack>
          </Stack>
        </Flex>
        {relatedEvents && <RelatedEvents relatedEvents={relatedEvents} />}
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
