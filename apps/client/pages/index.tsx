import Layout from '@/layouts';
import { EventProvider, useEvent, useUserLocation } from '@/hooks';
import { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import { HomeDiscovery, HomeSegmented } from '@/themes/babbo';
import { EventInterface, OrganizerType } from '@/types';
import {
  Box, Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Input, Heading, Text, Stack, Flex, AvatarGroup, Avatar, UseDisclosureProps
} from '@chakra-ui/react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { GoogleAdSense, OrganizerLeadForm } from '@/components';
import container from '@/container';
import { PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AxiosResponse } from 'axios';
import Link from 'next/link';

const publicOrganizerContainer = container.get<PublicOrganizerRepositoryInterface>('public-organizer');
const eventService = container.get<PublicRepositoryInterface>('public');


type GeoLocation = {
  lat: number | undefined;
  lng: number | undefined
}
export function Home() {


  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState<EventInterface[] | null>(null);
  const [limit, setLimit] = useState(10); // Número de eventos a serem buscados por requisição
  const [skip, setSkip] = useState(0); // Número de eventos a serem ignorados (para paginação)
  const [total, setTotal] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Record<string, any>>();
  const [eventShowcase, setEventShowcase] = useState<Record<string, any>>();

  const { userRegion, userCoordinates, userLocation } = useUserLocation();

  const [organizerShowcase, setOrganizerShowcase] = useState<OrganizerType[] | null>();

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
  //   eventService.showcase().then((response: AxiosResponse) => {
  //     setEventShowcase(response.data);
  //   })
  // }, [])
  
  useEffect(() => {

    publicOrganizerContainer.organizerShowcase().then((response: AxiosResponse) => {
      setOrganizerShowcase(response.data.data)
    })

  }, [])

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
      title={'Babbo :: Encontre bares, baladas, shows e muito mais aqui'}
      name={'client'}
      description={'Babbo Eventos'}
      keywords={'guia,baladas,shows,roles,festas,party,bares'}
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
          <Stack spacing={4} textAlign={'center'}>
            <Heading fontWeight={'500'} size={'md'}> Continue explorando nossos eventos</Heading>
            <Box><Button variant={'outline'} isLoading={loading} onClick={loadMore}>Carregar mais eventos</Button></Box>
          </Stack>
        }

        <Stack m={'auto'} mt={10} spacing={{ base: 0, md: 4 }} maxW='52rem'>
          <Heading textAlign={{ md: 'center' }} size={{ base: 'md', md: 'lg' }} fontWeight={'500'} mb={2}>Uma nova ferramenta gratuita para<br /> divulgar <Text as={'span'} color={'primary.500'}>seus eventos</Text></Heading>
          <Flex gap={8} direction={{ md: 'column' }} alignItems={'center'}>
            <Stack alignItems={{ md: 'center' }} spacing={6}>
              <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={{ md: 'center' }} fontWeight={'600'}>
                O Babbo é a plataforma perfeita para divulgar e promover seu evento. Comece agora e alcance mais pessoas!
              </Text>
              <Box textAlign={{ base: 'center' }}>
                <Button id="start" size={{ base: 'md', md: 'md' }} onClick={useDisclosureorganizerLeadForm.onOpen} colorScheme='green'>Comece agora</Button>
              </Box>
              <Stack>
                <AvatarGroup size='md' max={5}>
                  {organizerShowcase && organizerShowcase.map(organizer =>
                    <Avatar
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
        </Stack>
      </Stack>
      <OrganizerLeadForm useDisclosure={useDisclosureorganizerLeadForm} />

    </Layout>
  );
}


// const Map = ({ events }: { events: EventInterface[] | null }) => {

//   const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
//   const [mapCenter, setMapCenter] = useState<GeoLocation>({ lat: -23.5505, lng: -46.6333 }); // Defina o centro do mapa inicial

//   const mapContainerStyle = {
//     width: '100%',
//     minHeight: '100%',
//   };

//   const center = {
//     lat: -23.5505, // Latitude do centro do mapa
//     lng: -46.6333, // Longitude do centro do mapa
//   };


//   const mapOptions: google.maps.MapOptions | undefined = {
//     disableDefaultUI: true, // Desabilita os controles padrão do Google Maps
//     clickableIcons: true, // Desabilita os ícones clicáveis
//     streetViewControl: false, // Desabilita o controle de visualização da rua
//     styles: [
//       {
//         featureType: 'poi',
//         elementType: 'labels',
//         stylers: [{ visibility: 'off' }], // Oculta todos os rótulos de POI (pontos de interesse)
//       },
//       {
//         featureType: 'poi',
//         stylers: [{ visibility: 'off' }], // Oculta todos os POIs
//       },
//     ],
//   };


//   return (
//     <GoogleMap
//       options={mapOptions}
//       mapContainerStyle={mapContainerStyle}
//       center={mapCenter}
//       zoom={12} // Nível de zoom inicial
//     >
//       {events?.map(event => {
//         const geolocation: GeoLocation = {
//           lat: parseFloat(event.place_geolocation.split(',')[0]),
//           lng: parseFloat(event.place_geolocation.split(',')[1])
//         }

//         return <Marker
//           key={event.id}
//           position={{ lat: geolocation.lat as number, lng: geolocation.lng as number }}
//           onClick={() => {
//             setSelectedEvent(event)
//             setMapCenter(null)
//           }}

//         >
//         </Marker>


//       })}
//       {selectedEvent && <InfoWindow position={{
//         lat: parseFloat(selectedEvent.place_geolocation.split(',')[0]),
//         lng: parseFloat(selectedEvent.place_geolocation.split(',')[1])
//       }}>
//         <div>
//           <h2>{selectedEvent.name}</h2>
//         </div>
//       </InfoWindow>}
//     </GoogleMap>
//   );
// };


export default function Index() {
  return (
    <EventProvider>
      <Home />
    </EventProvider>
  );
}
