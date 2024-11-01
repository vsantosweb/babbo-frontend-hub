import Layout from '@/layouts';
import { AuthProvider, EventProvider, useEvent, useUserLocation } from '@/hooks';
import { useEffect, useState } from 'react';
import { HomeSegmented } from '@/themes/babbo';
import { EventInterface, OrganizerType } from '@/types';
import {
  Box, Button, useDisclosure, Heading, Text, Stack, Flex, AvatarGroup, Avatar, UseDisclosureProps
} from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { GoogleAdSense, OrganizerLeadForm } from '@/components';
import container from '@/container';
import { PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { HomeDiscovery } from '@/themes/babbo';

const publicOrganizerContainer = container.get<PublicOrganizerRepositoryInterface>('public-organizer');
const eventService = container.get<PublicRepositoryInterface>('public');


type GeoLocation = {
  lat: number | undefined;
  lng: number | undefined
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const showcase = await eventService.showcase();

  const organizerShowcase = await publicOrganizerContainer.organizerShowcase();

  return {
    props: {
      showcase: showcase.data,
      organizerShowcase: organizerShowcase.data.data
    }
  };

}

export default function Index() {

  return (
    <EventProvider>
      <HomePage />
    </EventProvider>
  )
}
function HomePage() {

  const [events, setEvents] = useState<EventInterface[] | null>(null);
  const [limit, setLimit] = useState(10); // Número de eventos a serem buscados por requisição
  const [skip, setSkip] = useState(0); // Número de eventos a serem ignorados (para paginação)
  const [total, setTotal] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Record<string, any>>();
  // const [eventShowcase, setEventShowcase] = useState<Record<string, any>>(showcase);
  const { fetchEvents, loading } = useEvent();
  const { userRegion, userCoordinates, userLocation } = useUserLocation();


  const useDisclosureorganizerLeadForm = useDisclosure();

  useEffect(() => {

    if (currentLocation !== userLocation) setSkip(0);

    fetchEvents({ skip: skip, limit: limit, ...userLocation }).then((response: any) => {
      setTotal(response.total);
      setEvents(response.data);
      setCurrentLocation(userLocation);
    });

  }, [userLocation, currentLocation]);

  // useEffect(() => {
  //   eventService.showcase({ ...userLocation }).then((response: AxiosResponse) => {
  //     setEventShowcase(response.data);
  //   })
  // }, [userLocation])

  const loadMore = () => {
    if (events) {
      setSkip(events.length)
      fetchEvents({ skip: events.length, limit: limit, ...userLocation }).then((response: any) => {
        setTotal(response.total);
        setEvents([...events, ...response.data]);
      });
    };
  };

  // console.log(events, 'eventseventsevents')
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */

  return (
      <Layout
        title={'Babbo - Encontre e Divulgue os Melhores Eventos e Artistas da Sua Região!'}
        name={'client'}
        description={'Aqui você encontra os melhores eventos da sua região, desde barzinhos aconchegantes, baldas, shows e muito mais!'}
        keywords={'baladas,shows,roles,festas,party,bares,barzinho,bares, lounge, bar e lounge'}
      >
        <Stack spacing={6} mt={8} flex={1}>
          {/* <Banner /> */}
          <Box className='app-wrapper' height={'auto'}>
            {/* <img src={'https://placehold.co/1280x120?text=Adsense'} /> <hr /> */}
            <GoogleAdSense adClient={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_KEY as string} adSlot={'2752189175'} />
          </Box>

          {/* <HomeSegmented showcase={eventShowcase} /> */}
          <HomeDiscovery dataDiscovery={events} />
          {total !== events?.length &&
            <Stack spacing={8} my='8' textAlign={'center'}>
              <Heading fontWeight={'500'} size={'md'}> Continue explorando nossos eventos</Heading>
              <Box><Button variant={'outline'} isLoading={loading} onClick={loadMore}>Carregar mais eventos</Button></Box>
            </Stack>
          }

          {/* <Stack m={'auto'} mt={10} spacing={{ base: 0, md: 4 }} maxW='52rem'>
          <Heading textAlign={{ md: 'center' }} size={{ base: 'md', md: 'lg' }} fontWeight={'500'} mb={2}>Uma nova ferramenta para<br /> divulgar <Text as={'span'} color={'primary.500'}>seus eventos</Text></Heading>
          <Flex gap={8} direction={{ md: 'column' }} alignItems={'center'}>
            <Stack alignItems={{ md: 'center' }} spacing={6}>
              <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={{ md: 'center' }} fontWeight={'600'}>
                Potencialize o seu evento com o Babbo! Destaque-se de maneira autêntica na comunidade. Comece agora mesmo!
              </Text>
              <Box textAlign={{ base: 'center' }}>
                <Button id="start" size={{ base: 'md', md: 'md' }} onClick={useDisclosureorganizerLeadForm.onOpen} colorScheme='green'>Comece agora</Button>
              </Box>
              <Stack>
                <AvatarGroup size='md' max={5}>
                  {organizerShowcase && organizerShowcase?.map((organizer: Record<string, any>, index: number) =>
                    <Avatar
                      key={index}
                      as={Link}
                      href={`/organizer?trackid=${organizer.uuid}`}
                      target='_blank'
                      name={organizer.organizer_name}
                      src={organizer.organizer_avatar}
                    />
                  )}

                </AvatarGroup>
                <Text fontSize={'sm'}>Junte-se a comunidade de organizadores</Text>
              </Stack>
            </Stack>

          </Flex>
        </Stack> */}
        </Stack>
        <OrganizerLeadForm useDisclosure={useDisclosureorganizerLeadForm} />

      </Layout>
  );
}