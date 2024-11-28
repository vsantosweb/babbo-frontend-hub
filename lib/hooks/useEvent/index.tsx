import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiResponseType, EventBanner, EventDisplayType, EventInterface, EventPayloadType, EventSessionType } from '@/types';
import { EventRepositoryInterface, CustomerEventRepositoryInterface, CustomerEventTicketRepositoryInterface } from '@/interfaces';
import moment from 'moment';
import container from '@/container';
import { useRouter } from 'next/router';
import { EventSessionInterface, useEventSession } from './session';
import { EventBatchInterface, useEventBatch } from './batch';
import { EventTicketInterface, useEventTicket } from './ticket';
import { ParsedUrlQuery } from 'querystring';

type EventProviderProps = {
  children: ReactNode;
  eventId?: string;
};

type EventContextType = EventSessionInterface & EventBatchInterface & EventTicketInterface & {
  ticketSales: () => Promise<ApiResponseType>;
  loading: boolean;
  error: string | null;
  event: EventInterface | null;
  fetchEvents: (params?: ParsedUrlQuery | Record<string, any>) => Promise<any>;
  fetchEvent: (id: number | string) => Promise<any>;
  summary: (id: number) => Promise<any>;
  fetchRelatedEvents: (id: number | string) => Promise<any>;
  fetchEventCategories: () => Promise<EventDisplayType[]>;
  fetchEventBanners: () => Promise<any>;
  fetchSearch: (name: string) => Promise<any>;
  fetchCategories: () => Promise<any>;
  fetchAvailableCities: () => Promise<any>;
  createEvent: (payload: EventPayloadType) => Promise<any>;
  setEvent: (event: EventInterface | null) => void;
  reload: boolean;
  setReload: (status: boolean) => void;

};

export const EventContext = createContext<EventContextType | undefined>(undefined);

export function useEvent() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must be used within an EventProvider')
  }
  return { ...context }
}

const customerEventTicket = container.get<CustomerEventTicketRepositoryInterface>('customer-event-ticket')
const eventServiceManager = container.get<CustomerEventRepositoryInterface>('customer-event')

export function EventProvider({ children }: EventProviderProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const eventService = container.get<EventRepositoryInterface>('public');

  const eventSession = useEventSession<'customer' | 'admin'>('customer');
  const eventBatch = useEventBatch<'customer' | 'admin'>('customer');
  const eventTicket = useEventTicket<'customer' | 'admin'>('customer');

  const router = useRouter();

  useEffect(() => {
    if (router.query.eventId) {
      fetchEvent(router.query.eventId as string)
      return;
    }
    setEvent(null)
  }, [router.query.eventId])

  async function fetchEvents(params?:  Record<string, any>): Promise<any> {
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
      setEvent(event.data);
      return event;
    } catch (error) {
      setError(
        'Erro ao buscar detalhes do evento. Por favor, tente novamente mais tarde.'
      );
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
      setError(
        'Erro ao buscar eventos relacionados. Por favor, tente novamente mais tarde.'
      );
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
      setError(
        'Erro ao buscar categorias de eventos. Por favor, tente novamente mais tarde.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function createEvent(payload: EventPayloadType): Promise<any> {
    setLoading(true);
    setError(null);

    try {
      const event = await eventServiceManager.createEvent(payload);
      return event;
    } catch (error) {
      setError('Erro ao criar evento. Por favor, tente novamente mais tarde.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchEventBanners(): Promise<any> {
    setLoading(true);
    setError(null);

    try {
      const banners = await eventService.banners();
      return banners;
    } catch (error) {
      setError(
        'Erro ao buscar banners de eventos. Por favor, tente novamente mais tarde.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchSearch(name: string): Promise<any> {
    await setLoading(true);
    setError(null);

    try {
      const events = await eventService.search(name);
      return events;
    } catch (error) {
      setError(
        'Erro ao buscar eventos. Por favor, tente novamente mais tarde.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories(): Promise<any> {
    try {
      const events = await eventService.categories();
      return events;
    } catch (error) {
      setError(
        'Erro ao buscar eventos. Por favor, tente novamente mais tarde.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchAvailableCities(): Promise<any> {
    try {
      const events = await eventService.availableCities();
      return events;
    } catch (error) {
      setError(
        'Erro ao buscar eventos. Por favor, tente novamente mais tarde.'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function ticketSales(): Promise<ApiResponseType> {
    return event?.uuid && (await customerEventTicket.ticketSales(event?.uuid)).data
  }

  async function summary(id: number) {
    setLoading(true);
    setError(null);

    try {
      const event = await eventServiceManager.summary(id)
      return event;
    } catch (error) {
      setError('Erro ao buscar dados.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <EventContext.Provider
      value={{
        summary,
        ticketSales,
        loading,
        error,
        fetchEvents,
        fetchEvent,
        fetchRelatedEvents,
        fetchEventCategories,
        fetchEventBanners,
        fetchSearch,
        fetchCategories,
        fetchAvailableCities,
        createEvent,
        event,
        setEvent,
        reload,
        setReload,
        ...eventSession,
        ...eventBatch,
        ...eventTicket,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
