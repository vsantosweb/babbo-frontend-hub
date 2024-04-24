import Layout from '@/layouts';
import { EventProvider, useEvent } from '@/hooks';
import { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
import { HomeDiscovery } from '@/themes/babbo';
import { EventInterface } from '@/types';
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
import { OrganizerLeadForm } from '@/components';


type GeoLocation = {
  lat: number | undefined;
  lng: number | undefined
}
export function Home() {


  const { fetchEvents, loading } = useEvent();
  const [events, setEvents] = useState<EventInterface[] | null>(null);
  const [limit, setLimit] = useState(8); // Número de eventos a serem buscados por requisição
  const [skip, setSkip] = useState(0); // Número de eventos a serem ignorados (para paginação)
  const [total, setTotal] = useState(0);
  const useDisclosureorganizerLeadForm = useDisclosure();

  useEffect(() => {
    fetchEvents({ skip: skip, limit: limit }).then((response: any) => {
      setTotal(response.total);
      events ? setEvents([...events, ...response.data]) : setEvents(response.data);
    });
  }, [skip]);

  const loadMore = () => {
    if (events) setSkip(events.length);
  };

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
      <Stack spacing={6} mt={8}>
        {/* <Banner /> */}
        <Box className='app-wrapper' minHeight={'90px'} height={'auto'} pb={6}>
          <img src={'https://placehold.co/1280x120?text=Adsense'} /> <hr />
          {/* <GoogleAdSense adClient='ca-pub-8530046753205274' adSlot={'2752189175'}/> */}

        </Box>
        <HomeDiscovery dataDiscovery={events} />
        {total !== events?.length &&
          <Box textAlign={'center'}>
            <Button variant={'ghost'} isLoading={loading} onClick={loadMore}>Carregar mais</Button>
          </Box>
        }

        <Stack m={'auto'} spacing={{ base: 0, md: 4 }} maxW='52rem'>
          <Heading textAlign={{ md: 'center' }} size={{ base: 'lg', md: 'xl' }} mb={4}>Uma nova ferramenta gratuita para<br /> divulgar <Text as={'span'} color={'primary.500'}>seus eventos</Text></Heading>
          <Flex gap={8} direction={{ md: 'column' }} alignItems={'center'}>
            <Stack alignItems={{ md: 'center' }} spacing={6}>
              <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={{ md: 'center' }} fontWeight={'600'}>
                O Babbo é a plataforma perfeita para divulgar e promover seu evento. Comece agora e alcance mais pessoas!
              </Text>
              <Box>
                <Button size={{ base: 'md', md: 'lg' }} onClick={useDisclosureorganizerLeadForm.onOpen} colorScheme='green'>Comece agora - É grátis</Button>
              </Box>
              <Stack>
                <AvatarGroup size='md' max={5}>
                  <Avatar name='Ryan Florence' src='https://yt3.googleusercontent.com/ytc/AIdro_nfvheXiqZBRe-oq_6pkqbpQYuycBqMqQn5MMTD=s900-c-k-c0x00ffffff-no-rj' />
                  <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                  <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                  <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                  <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                  <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                  <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
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
