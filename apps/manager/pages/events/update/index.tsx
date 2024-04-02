
import { EventProvider, useEvent } from '@/hooks';
import EventForm from '../forms';
import Layout from '@/layouts';

export default function UpdateEvent() {
    return (
        <Layout name='manager'>
            <EventProvider>
                <EventForm />
            </EventProvider>
        </Layout>

    )
}


