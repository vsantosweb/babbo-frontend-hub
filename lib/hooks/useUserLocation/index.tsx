import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const UseUserLocationContext = createContext<any>({});

interface UserLocationInterface {
    getUserLocation: (callback?: (position: GeolocationPosition) => void) => void | GeolocationPosition
    defineUserCity: (city: string) => void
    userCity: string | null
    userRegion: string | null
    setUserRegion: (city: string) => void
    userCoordinates: Record<string, number>
    userLocation: Record<string, any>
}

export function useUserLocation(): UserLocationInterface {

    const context = useContext(UseUserLocationContext);

    return { ...context }
}


export function UserLocationProvider({ children }: { children: ReactNode }) {

    // useEffect(() => { navigator.geolocation.getCurrentPosition(getPosition) }, [])

    const [userCoordinates, setUserCoordinates] = useState<Record<string, number>>();
    const [userRegion, setUserRegion] = useState<string | null>();
    const [userLocation, setUserLocation] = useState<Record<string, any> | null>();

    useEffect(() => {

        const userLocationStorage = localStorage?.getItem('user_location');

        if (userLocationStorage !== null) {

            const parsed = JSON.parse(userLocationStorage)

            setUserLocation(parsed)
        }
    }, [setUserCoordinates, setUserRegion])

    const getUserLocation = (callback: (position: GeolocationPosition) => any) => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {

                    setUserRegion('Perto de mim')

                    const coordinates = { geolocation: `${position.coords.latitude}, ${position.coords.longitude}` };

                    setUserLocation({ geolocation: `${position.coords.latitude}, ${position.coords.longitude}` })

                    localStorage.setItem('user_location', JSON.stringify(coordinates));

                    callback && callback(position)

                    return position;
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );

        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    const defineUserCity = (city: string) => {

        setUserRegion(city);

        const cityObj = { region: city.split(',')[0], label: city };

        setUserLocation(cityObj);

        localStorage.setItem('user_location', JSON.stringify(cityObj));
    }
    
    return (
        <UseUserLocationContext.Provider value={{
            getUserLocation,
            defineUserCity,
            userRegion,
            setUserRegion,
            userCoordinates,
            userLocation
        }}>
            {children}
        </UseUserLocationContext.Provider>
    )
}