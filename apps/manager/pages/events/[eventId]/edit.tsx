
import { EventProvider, useEvent } from '@/hooks';
import EventForm from '../../../components/forms/event';
import Layout from '@/layouts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventRepositoryInterface } from '@/interfaces';

import container from '@/container';
import { EventInterface } from '@/types';

export default function EditEvent() {

    const { event } = useEvent();

    return (
        <Layout name='manager'>
            <EventForm event={event} />
        </Layout>

    )
}


