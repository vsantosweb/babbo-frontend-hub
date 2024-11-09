import { useEffect, useState } from 'react'
import { EventSessionRepositoryInterface } from '@/interfaces';

import container from '@/container';
import { ApiResponseType, EventSessionType } from '@/types';

export interface EventSessionInterface {
    handleCreateSession(payload: EventSessionType, eventId: number): Promise<unknown>; // Cria uma nova sessão
    handleUpdateSession(payload: EventSessionType, eventId: number, sessionId: number): Promise<unknown>; // Atualiza uma sessão existente
    handleDeleteSession(eventId: number, sessionId: number): Promise<unknown>; // Remove uma sessão
    getSessions(eventId: number): Promise<ApiResponseType>
    sessions: EventSessionType[] | null
}

type Repository = 'customer' | 'admin'

enum CRUD_STATUS {
    CREATED = 'created',
    UPDATED = 'updated',
    DELETED = 'deleted'
}
export function useEventSession<T extends Repository>(repository: T): EventSessionInterface {

    const eventSessionService = container.get<EventSessionRepositoryInterface>(`${repository}-event-session`);
    
    const [sessions, setSessions] = useState<EventSessionType[] | null>(null);
    const [hydrate, setHydrate] = useState<number | null>();

    const getSessions = async (eventId: number) => {
       return eventSessionService.get(eventId).then(response => response)
    }

    const handleCreateSession = async (payload: EventSessionType, eventId: number) => {

        return await eventSessionService.create(payload, eventId).then((response) => {
            setHydrate(Math.random())
            return response
        });
    }

    const handleUpdateSession = async (payload: EventSessionType, eventId: number, sessionId: number) : Promise<unknown> => {

        return await eventSessionService.update(payload, eventId, sessionId).then(() => setHydrate(Math.random()));
    }
    const handleDeleteSession = async (eventId: number, sessionId: number) => {

        return await eventSessionService.destroy(eventId, sessionId).then(() => setHydrate(Math.random()));
    }

    return { handleCreateSession, handleUpdateSession, handleDeleteSession, getSessions, sessions }
}
