import { theme } from '@/themes/default';
import { EventInterface } from '@/types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function EventMap({ event }: { event: EventInterface }) {

    const mapContainerStyle = {
        height: "400px",
        width: "100%",
        borderRadius: theme.defaultRadius
    };
    
    const eventGeolocation: string[] | undefined = event.geolocation.split(',')

    const center = {
        lat: parseFloat(eventGeolocation[0]),
        lng: parseFloat(eventGeolocation[1])
    };  

    const mapOptions: google.maps.MapOptions | undefined = {
        disableDefaultUI: true, // Desabilita os controles padrão do Google Maps
        clickableIcons: true, // Desabilita os ícones clicáveis
        streetViewControl: false, // Desabilita o controle de visualização da rua
        zoomControl: true,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }], // Oculta todos os rótulos de POI (pontos de interesse)
            },
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }], // Oculta todos os POIs
            },
        ],
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            <GoogleMap
                options={mapOptions}
                mapContainerStyle={mapContainerStyle}
                center={center as never}
                zoom={14}
            >
                <Marker position={center as never} />
            </GoogleMap>
        </LoadScript>
    );
}
