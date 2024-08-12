import { useEffect, useState } from 'react'
import { AdminEventLotRepositoryInterface } from '@/interfaces';

import container from '@/container';
import useEventSession from './useEventSession';

const adminTicketLotService = container.get<AdminEventLotRepositoryInterface>('admin-event-ticket-lot');

type EventLotType = {
    id: number,
    name: string,
} 


export default function useTicketLot(sessionId: number, eventId: number) {

    const [lots, setLots] = useState<EventLotType[]>([]);
    const { setHydrate } = useEventSession(eventId);

    const handleCreateLot = async (payload: Record<string, any>) => {

        return await adminTicketLotService.create(payload, eventId, sessionId).then(() => setHydrate(Math.random()));
    }

    const handleUpdateLot = async (payload: Record<string, any>, eventId: number, lotId: number) => {

        return await adminTicketLotService.update(payload, eventId, lotId, lotId).then(() => setHydrate(Math.random()));
    }
    const handleDeleteLot = async (eventId: number, sessionId: number, lotId: number) => {

        return await adminTicketLotService.destroy(eventId, sessionId, lotId).then(() => setHydrate(Math.random()));
    }

    return { handleCreateLot, handleUpdateLot, handleDeleteLot, lots }
}
