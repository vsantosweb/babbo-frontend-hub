// pages/events/[id]/layout.tsx
import { EventProvider } from "@/hooks";
import { GetServerSidePropsContext } from "next/types";

const EventPanelContext = ({ children, eventId }: {children: JSX.Element, eventId: string}) => {
    return (
        <EventProvider eventId={eventId}>
            {children}
        </EventProvider>
    );
};

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    
    console.log(params, 'params')
    return { props: params };
}

export default EventPanelContext;
