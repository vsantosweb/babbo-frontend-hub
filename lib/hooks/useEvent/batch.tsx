import { useEffect, useState } from 'react';
import { EventTicketBatchRepositoryInterface } from '@/interfaces';
import container from '@/container';
import { ApiResponseType, EventTicketBatchType } from '@/types';

export interface EventBatchInterface {
    handleCreateBatch(payload: EventTicketBatchType, ticketId: number): Promise<unknown>;
    handleUpdateBatch(payload: EventTicketBatchType, ticketId: number, batchId: number): Promise<unknown>;
    handleDeleteBatch( ticketId: number, batchId: number): Promise<unknown>;
    getBatches( ticketId: number): Promise<ApiResponseType>;
    batches: EventTicketBatchType[] | null;
}

type Repository = 'customer' | 'admin';

export function useEventBatch<T extends Repository>(repository: T): EventBatchInterface {

    const eventBatchService = container.get<EventTicketBatchRepositoryInterface>(`${repository}-event-batch`);
    
    const [batches, setBatches] = useState<EventTicketBatchType[] | null>(null);
    const [hydrate, setHydrate] = useState<number | null>();

    const getBatches = async ( ticketId: number) => {
       return eventBatchService.get(ticketId).then(response => response);
    };

    const handleCreateBatch = async (payload: EventTicketBatchType,  ticketId: number) => {
        return await eventBatchService.create(payload, ticketId).then((response) => {
            setHydrate(Math.random());
            return response;
        });
    };

    const handleUpdateBatch = async (payload: EventTicketBatchType,  ticketId: number, batchId: number): Promise<unknown> => {
        return await eventBatchService.update(payload, ticketId, batchId).then(() => setHydrate(Math.random()));
    };

    const handleDeleteBatch = async ( ticketId: number, batchId: number) => {
        return await eventBatchService.destroy(ticketId, batchId).then(() => setHydrate(Math.random()));
    };

    return { handleCreateBatch, handleUpdateBatch, handleDeleteBatch, getBatches, batches };
}
