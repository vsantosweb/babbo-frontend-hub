import { useEffect, useState } from 'react'
import { EventSessionRepositoryInterface } from '@/interfaces';

import container from '@/container';
import { EventSessionType } from '@/types';


export function useEventSession(repository: 'customer' | 'admin') {

    const eventSessionService = container.get<EventSessionRepositoryInterface>(`${repository}'-event-session'`);

    const [sessions, setSessions] = useState<EventSessionType[]>([])
    const [hydrate, setHydrate] = useState<number | null>();

    // useEffect(() => {
    //     eventSessionService.get(eventId).then(response => setSessions(response.data))
    // }, [eventId, hydrate])

    const handleCreateSession = async (eventId: number, payload: EventSessionType) => {

        return await eventSessionService.create(payload, eventId).then(() => setHydrate(Math.random()));
    }

    const handleUpdateSession = async (eventId: number, payload: EventSessionType, sessionId: number) => {

        return await eventSessionService.update(payload, eventId, sessionId).then(() => setHydrate(Math.random()));
    }
    const handleDeleteSession = async (eventId: number, sessionId: number) => {

        return await eventSessionService.destroy(eventId, sessionId).then(() => setHydrate(Math.random()));
    }

    return { handleCreateSession, handleUpdateSession, handleDeleteSession, sessions, setHydrate }
}
