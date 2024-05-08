import { CheckIcon, Search2Icon } from "@chakra-ui/icons";
import {

    LoadScript,
    StandaloneSearchBox,

} from "@react-google-maps/api";
import { ReactNode, useState } from "react";

export function GoogleAutoComplete({ children, captureAddress }: { children: ReactNode, captureAddress: (address: any) => void }) {

    const [map, setMap] = useState<google.maps.Map>();
    const [searchBoxA, setSearchBoxA] =
        useState<google.maps.places.SearchBox>();

    const onLoadA = (ref: google.maps.places.SearchBox) => {
        setSearchBoxA(ref);
    };

    const handleAddress = () => {

        const places = searchBoxA!.getPlaces();

        if (places) {
            captureAddress(places[0])
        }
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}
                libraries={["places"]}
            >
                <div className="address">
                    <StandaloneSearchBox
                        onLoad={onLoadA}
                        onPlacesChanged={handleAddress}
                    >
                        {children}
                    </StandaloneSearchBox>

                </div>
            </LoadScript>
        </div>
    )
}
