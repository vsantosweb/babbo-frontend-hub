
import { EventProvider, useEvent } from '@/hooks';
import EventForm from '../../../components/forms';
import Layout from '@/layouts';

export default function CreateEvent() {
    return (
        <Layout name='manager'>
            <EventProvider>
                <EventForm />
            </EventProvider>
        </Layout>

    )
}


