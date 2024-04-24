import container from "@/container";
import { PublicOrganizerRepositoryInterface } from "@/interfaces";
import Layout from "@/layouts";
import { OrganizerPage } from "@/themes/babbo";
import { EventInterface } from "@/types";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const publicOrganizerContainer = container.get<PublicOrganizerRepositoryInterface>('public-organizer');

export default function Organizer() {

    const [events, setEvents] = useState<EventInterface[]>();
    const [organizerProfile, setOrganizerProfile] = useState();

    const router = useRouter();

    useEffect(() => {

        if (router.query.trackid) {

            publicOrganizerContainer.organizerProfile(router.query.trackid as string).then((response: AxiosResponse) => {

                setOrganizerProfile(response.data.data)
                
                publicOrganizerContainer.organizerEvents(router.query.trackid as string)
                    .then((response: AxiosResponse) => {
                        setEvents(response.data)
                        console.log(response)
                    })
            }).catch(error => {
                if (error.response.status === 404) router.push('404')
            })

        }
    }, [router.query])

    return (
        <Layout name='client'>
            <OrganizerPage events={events} organizerProfile={organizerProfile} />
        </Layout>
    )
}
