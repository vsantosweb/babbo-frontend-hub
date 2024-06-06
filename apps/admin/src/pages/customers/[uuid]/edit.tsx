import { GetServerSidePropsContext } from "next";
import EventForm from "../form";
import container from "@/container";

import { AdminEventRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';

const adminEventService = container.get<AdminEventRepositoryInterface>('admin-event');


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const id: string = query?.uuid as string

    const event = await adminEventService.show(id);

    return {
        props: {
            event: event.data
        }
    };
}

export default function EditEvent({ event }: { event: EventInterface }) {
    return (
        <EventForm event={event} />
    )
}
