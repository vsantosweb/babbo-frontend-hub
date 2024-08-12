import React, { useEffect, useState } from 'react'
import { AdminEventSessionRepositoryInterface } from '@/interfaces';

import container from '@/container';

const adminEvenSessiontService = container.get<AdminEventSessionRepositoryInterface>('admin-event-session');

type EventSessionType = {
    id: number,
    name: string,
}


export default function useEventSession(eventId: number) {

    const [sessions, setSessions] = useState<EventSessionType[]>([])
    const [hydrate, setHydrate] = useState<number | null>();

    useEffect(() => {
        adminEvenSessiontService.get(eventId).then(response => setSessions(response.data))
    }, [eventId, hydrate])

    const handleCreateSession = async (payload: Record<string, any>) => {

        return await adminEvenSessiontService.create(payload, eventId).then(() => setHydrate(Math.random()));
    }

    const handleUpdateSession = async (payload: Record<string, any>, sessionId: number) => {

        return await adminEvenSessiontService.update(payload, eventId, sessionId).then(() => setHydrate(Math.random()));
    }
    const handleDeleteSession = async (sessionId: number) => {

        return await adminEvenSessiontService.destroy(eventId, sessionId).then(() => setHydrate(Math.random()));
    }

    return { handleCreateSession, handleUpdateSession, handleDeleteSession, sessions, setHydrate }
}
