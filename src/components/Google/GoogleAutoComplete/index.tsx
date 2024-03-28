import { CheckIcon, Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement } from "@chakra-ui/react";
import {
    GoogleMap,
    Marker,
    LoadScript,
    StandaloneSearchBox,
    DirectionsService,
    DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";

export function GoogleAutoComplete({ captureAddress }: { captureAddress: (address:any) => void }) {

    const [map, setMap] = useState<google.maps.Map>();
    const [searchBoxA, setSearchBoxA] =
        useState<google.maps.places.SearchBox>();
    const [searchBoxB, setSearchBoxB] =
        useState<google.maps.places.SearchBox>();
    const [pointA, setPointA] = useState<google.maps.LatLngLiteral>();
    const [pointB, setPointB] = useState<google.maps.LatLngLiteral>();

    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(
        null
    );
    const [destination, setDestination] =
        useState<google.maps.LatLngLiteral | null>(null);

    const [response, setResponse] =
        useState<google.maps.DistanceMatrixResponse | null>(null);

    const position = {
        lat: -27.590824,
        lng: -48.551262,
    };

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    const onLoadA = (ref: google.maps.places.SearchBox) => {
        setSearchBoxA(ref);
    };

    const onLoadB = (ref: google.maps.places.SearchBox) => {
        setSearchBoxB(ref);
    };

    const handleAddress = () => {
        const places = searchBoxA!.getPlaces();
        
        if(places){
            const address = places[0]?.address_components;
            captureAddress(address)
        }
       
        // console.log(places);
        // const place = places![0];
        // const location = {
        //     lat: place?.geometry?.location?.lat() || 0,
        //     lng: place?.geometry?.location?.lng() || 0,
        // };
        // setPointA(location);
        // setOrigin(null);
        // setDestination(null);
        // setResponse(null);
        // map?.panTo(location);

    };


    const directionsRendererOptions = useMemo<any>(() => {
        return {
            directions: response,
        };
    }, [response]);



    return (
        <div>
            <LoadScript
                googleMapsApiKey={'AIzaSyCA5aHbpVrnwcd0Gr0Z9dq_GK8Mm-3cR1E'}
                libraries={["places"]}
            >
                <div className="address">
                    <StandaloneSearchBox
                        onLoad={onLoadA}
                        onPlacesChanged={handleAddress}
                    >
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='1.2em'
                            >
                                <Search2Icon/>

                            </InputLeftElement>
                            <Input placeholder='Digite o endereço' />

                        </InputGroup>
                    </StandaloneSearchBox>

                </div>
            </LoadScript>
        </div>
    )
}
