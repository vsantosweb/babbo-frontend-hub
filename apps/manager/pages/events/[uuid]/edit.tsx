
import { EventProvider } from '@/hooks';
import EventForm from '../../../components/forms';
import Layout from '@/layouts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventRepositoryInterface } from '@/interfaces';

import container from '@/container';
import { EventInterface } from '@/types';

const eventServiceManager = container.get<EventRepositoryInterface>('event-manager');

export default function EditEvent() {

    const router = useRouter();
    const [event, setEvent] = useState<EventInterface>();

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


