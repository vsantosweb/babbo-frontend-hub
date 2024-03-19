import { useState } from 'react';
import { EventBanner, EventDisplayType, EventInterface } from '@/types';
import container from 'src/repository/providers/container';
import { EventRepositoryInterface } from '@/interfaces';
import moment from 'moment';


export function useEvent() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [event, setEvent] = useState<EventInterface | null>(null);

    const eventService = container.get<EventRepositoryInterface>('public');

    async function fetchEvents(params?: string): Promise<EventInterface[] | any> {
        setLoading(true);
        setError(null);

        try {
            const events = await eventService.events(params);
            return events;
        } catch (error) {
            setError('Erro ao buscar eventos. Por favor, tente novamente mais tarde.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function fetchEvent(id: number | string) {
        setLoading(true);
        setError(null);

        try {
            const event = await eventService.event(id);
            setEvent(event.data)
            return event;
        } catch (error) {
            setError('Erro ao buscar detalhes do evento. Por favor, tente novamente mais tarde.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function fetchRelatedEvents(id: number | string): Promise<any> {
        setLoading(true);
        setError(null);

        try {
            const relatedEvents = await eventService.related(id);
            return relatedEvents;
        } catch (error) {
            setError('Erro ao buscar eventos relacionados. Por favor, tente novamente mais tarde.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function fetchEventCategories(): Promise<EventDisplayType[]> {
        setLoading(true);
        setError(null);

        try {
            const categories = await eventService.displayTypes();
            return categories;
        } catch (error) {
            setError('Erro ao buscar categorias de eventos. Por favor, tente novamente mais tarde.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function fetchEventBanners(): Promise<EventBanner[]> {
        setLoading(true);
        setError(null);

        try {
            const banners = await eventService.banners();
            return banners;
        } catch (error) {
            setError('Erro ao buscar banners de eventos. Por favor, tente novamente mais tarde.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getFormattedDate = (event: EventInterface | null): { fully: string, partial: string } => {

        const diffDate = moment(event?.end_date).diff(event?.start_date, 'days');

        if (diffDate > 0) return {
            fully: `${moment(event?.start_date).format('DD MMM - YYYY, LT').toUpperCase()} > ${moment(event?.end_date).format('DD MMM - YYYY, LT').toUpperCase()}`,
            partial: `${moment(event?.start_date).format('DD MMM').toUpperCase()} • ${moment(event?.end_date).format('DD MMM').toUpperCase()}`,
        }

        return {
            fully: `${moment(event?.start_date).format('DD MMM - YYYY, LT').toUpperCase()}`,
            partial: `${moment(event?.start_date).format('DD MMM [-] HH a').toUpperCase()}`,
        }

    }

    return {
        loading,
        error,
        fetchEvents,
        fetchEvent,
        fetchRelatedEvents,
        fetchEventCategories,
        fetchEventBanners,
        getFormattedDate
    };
}