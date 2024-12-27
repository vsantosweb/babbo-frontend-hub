
import { EventProvider, useEvent } from '@/hooks';
import EventForm from '../../../components/forms/event';
import Layout from '@/layouts';

export default function CreateEvent() {
    return (
        <Layout name='manager' title='Criar evento'>
            <EventProvider>
                <EventForm />
            </EventProvider>
        </Layout>
    )
}


