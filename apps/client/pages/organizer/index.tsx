import container from "@/container";
import { PublicOrganizerRepositoryInterface } from "@/interfaces";
import Layout from "@/layouts";
import { OrganizerPage } from "@/themes/babbo";
import { EventInterface, OrganizerType } from "@/types";
import { GetServerSidePropsContext } from "next";

const publicOrganizerContainer = container.get<PublicOrganizerRepositoryInterface>('public-organizer');

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const trackid: string = query?.trackid as string

    try {

        const organizerFetchData = await publicOrganizerContainer.organizerProfile(trackid);
        const organizerEventsFetchData = await publicOrganizerContainer.organizerEvents(trackid)

        const organizerData = organizerFetchData.data.data;
        const organizerEventsData = organizerEventsFetchData.data;

        return { props: { organizerData, organizerEventsData } };

    } catch (error: any) {

        if (error?.response.status === 404) {
            context.res.writeHead(302, { Location: '/404' });
            context.res.end();
        }

    }

    return { props: { data: null } };

}

type OrganizerProps = {
    organizerData: OrganizerType,
    organizerEventsData: EventInterface[]
}

export default function Organizer({ organizerData, organizerEventsData }: OrganizerProps) {

    return (
        <Layout
            name='client'
            image={organizerData?.organizer_avatar}
            title={organizerData?.organizer_name}
            description={organizerData?.organizer_description}>
            <OrganizerPage events={organizerEventsData} organizerProfile={organizerData} />
        </Layout>
    )
}
