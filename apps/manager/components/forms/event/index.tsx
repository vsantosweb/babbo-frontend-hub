import {
    Button,
    Heading,
    Flex,
    FormControl,
    Stack,
    HStack,
    Divider,
    FormErrorMessage,
    Checkbox
} from '@chakra-ui/react'
import * as Yup from 'yup';

import AddressForm from './address-form';
import EventInfoForm from './event-info-form';
import { EventImageUpload } from '@/components';
import { SessionHelper } from '@/helpers';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventValidatorSchema } from '../../../validators';
import { EventPayloadType } from '@/types';
import { useEffect } from 'react';
import moment from 'moment';
import container from '@/container';
import { CustomerEventRepositoryInterface } from '@/interfaces';
import SponsoredForm from './sponsored-form';
import TicketForm from './ticket-form';

const eventCustomerService = container.get<CustomerEventRepositoryInterface>('customer-event');

const validationSchema = Yup.object().shape({ ...eventValidatorSchema });

const EventForm = ({ event }: { event?: Record<string, any> }) => {

    const eventForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

    useEffect(() => {

        if (event) {

            const startDate: any = moment(event.start_date).format("YYYY-MM-DD HH:mm");
            const endDate: any = moment(event.end_date).format("YYYY-MM-DD HH:mm");

            eventForm.setValue('name', event?.name, { shouldValidate: true });
            eventForm.setValue('description', event.description, { shouldValidate: true });
            eventForm.setValue('event_image', event.event_image, { shouldValidate: true });
            eventForm.setValue('has_external_ticket', event.has_external_ticket, { shouldValidate: true });
            eventForm.setValue('ticket_partner_name', event.ticket_partner_name, { shouldValidate: true });
            eventForm.setValue('ticket_partner_url', event.ticket_partner_url, { shouldValidate: true });
            eventForm.setValue('start_date', startDate, { shouldValidate: true });
            eventForm.setValue('end_date', endDate, { shouldValidate: true });
            eventForm.setValue('category', {value: event.category, label: event.category}, { shouldValidate: true })
            eventForm.setValue('place.full_address', event.place.formatted_address, { shouldValidate: true });
            eventForm.setValue('place.name', event.place.name, { shouldValidate: true });
            eventForm.setValue('place.address_1', event.place.address_1, { shouldValidate: true });
            eventForm.setValue('place.address_2', event.place.address_2, { shouldValidate: true });
            eventForm.setValue('place.zipcode', event.place.zipcode, { shouldValidate: true });
            eventForm.setValue('place.city', event.place.city, { shouldValidate: true });
            eventForm.setValue('place.state', event.place.state, { shouldValidate: true });
            eventForm.setValue('place.address_number', event.place.address_number, { shouldValidate: true });
        }

    }, [event])

    const handleCreateEvent = async (formData: Record<string, any>) => {

        const payload = getPayload(formData);

        await eventCustomerService.createEvent(payload).then((response: Record<string, any>) => {
            SessionHelper.redirectWith('/', 'eventCreated',
                `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi criado com sucesso. Vamos fazer uma análise e disponibiliza-lo na plataforma em até 24h.`
            );
        })

    }

    const getPayload = (formData: Record<string, any>) => {

        const payload: EventPayloadType = {
            name: formData.name,
            place: formData.place,
            has_external_ticket: formData.has_external_ticket,
            ticket_partner_name: formData.ticket_partner_name,
            ticket_partner_url: formData.ticket_partner_url,
            start_date: moment(formData.start_date).format('YYYY-MM-DD HH:mm'),
            end_date: moment(formData.end_date).format('YYYY-MM-DD HH:mm'),
            description: formData.description,
            category: formData.category.value,
        }

        if (formData.image) payload.event_image = formData.event_image;

        return payload;
    }

    const handleUpdateEvent = async (formData: Record<string, any>) => {

        const payload = getPayload(formData);

        await eventCustomerService.updateEvent(payload, event?.id).then((response: Record<string, any>) => {

            SessionHelper.redirectWith('/', 'eventUpdated',
                `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi atualizado.`
            );

        })
    }

    return (

        <FormProvider {...eventForm}>
            <Flex as={'form'}
                onSubmit={!event ? eventForm.handleSubmit(handleCreateEvent) : eventForm.handleSubmit(handleUpdateEvent)}
                gap={4}
                width={'930px'}
                maxWidth={'100%'}
                margin={'auto'}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Stack spacing={4}>
                    <FormControl isInvalid={!!eventForm?.formState?.errors?.event_image}>
                        <EventImageUpload hookForm={eventForm} />
                        <FormErrorMessage>{eventForm?.formState?.errors?.event_image?.message as string}</FormErrorMessage>
                    </FormControl>
                </Stack>

                <Stack flex={1} spacing={8}>

                    <Stack spacing={4}>
                        <Heading size={'md'}>Endereço</Heading>
                        <AddressForm hookForm={eventForm} />
                    </Stack>


                    <Stack spacing={4}>
                        <EventInfoForm hookForm={eventForm} />
                    </Stack>
                    <Divider />
                    <Stack>
                        <Heading size={'lg'}>Ingressos</Heading>
                        <TicketForm />
                    </Stack>
                    <HStack justifyContent={'flex-end'}>
                        <Button
                            isLoading={eventForm.formState.isSubmitting}
                            type={'submit'}>{!event ? 'Criar evento' : 'Atualizar'}</Button>
                    </HStack>
                </Stack>
            </Flex>
        </FormProvider>
    )
}

export default EventForm;