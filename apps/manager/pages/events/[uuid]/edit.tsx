
import { EventProvider, useEvent } from '@/hooks';
import EventForm from '../forms';
import Layout from '@/layouts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { EventRepositoryInterface } from '@/interfaces';

import container from '@/container';
import { EventInterface } from '@/types';

const eventServiceManager = container.get<EventRepositoryInterface>('event-manager');

export default function EditEvent() {

    const eventForm = useForm();

    const router = useRouter();
    const [event, setEvent] = useState<EventInterface>();
    const [relatedEvents, setRelatedEvents] = useState<EventInterface[]>();

    useEffect(() => {

        const id = router.query.uuid;

        if (id) {
            eventServiceManager.event(id as string).then((response: any) => {
                setEvent(response.data);
            });
        }
        
    }, [router]);

    return (
        <Layout name='manager'>
            <EventProvider>
                <EventForm event={event} />
            </EventProvider>
        </Layout>

    )
}


