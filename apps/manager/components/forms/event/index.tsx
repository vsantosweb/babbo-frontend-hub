import {
    Button,
    Heading,
    Flex,
    FormControl,
    Stack,
    HStack,
    Divider,
    FormErrorMessage,
    Checkbox,
    useToast
} from '@chakra-ui/react'
import * as Yup from 'yup';

import AddressForm from './address-form';
import EventInfoForm from './event-info-form';
import { EventImageUpload } from '@/components';
import { SessionHelper } from '@/helpers';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventValidatorSchema } from '../../../validators';
import { EventInterface, EventPayloadType } from '@/types';
import { useEffect } from 'react';
import moment from 'moment';
import container from '@/container';
import { CustomerEventRepositoryInterface } from '@/interfaces';
import SponsoredForm from './sponsored-form';
import TicketForm from './ticket-form';
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useEvent } from '@/hooks';

const eventCustomerService = container.get<CustomerEventRepositoryInterface>('customer-event');

const validationSchema = Yup.object().shape({ ...eventValidatorSchema });

const EventForm = () => {

    const { eventCustomer } = useEvent();

    const eventForm = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const toast = useToast();

    useEffect(() => {

        const event = eventCustomer;
        if (event) {
            const startDate: any = moment(event.start_date).format("YYYY-MM-DD HH:mm");
            const endDate: any = moment(event.end_date).format("YYYY-MM-DD HH:mm");
            console.log(event, 'eventevent')
            eventForm.setValue('name', event.name, { shouldValidate: true });
            eventForm.setValue('description', event?.description, { shouldValidate: true });
            eventForm.setValue('event_image', event.event_image, { shouldValidate: true });
            eventForm.setValue('is_private', event.is_private, { shouldValidate: true });
            eventForm.setValue('ticket_partner_name', event.ticket_partner_name, { shouldValidate: true });
            eventForm.setValue('ticket_partner_url', event.ticket_partner_url, { shouldValidate: true });
            eventForm.setValue('start_date', startDate, { shouldValidate: true });
            eventForm.setValue('end_date', endDate, { shouldValidate: true });
            eventForm.setValue('category', { value: event.category, label: event.category }, { shouldValidate: true })
            eventForm.setValue('place.full_address', event.full_address, { shouldValidate: true });
            eventForm.setValue('place.name', event.place_name, { shouldValidate: true });
            // eventForm.setValue('place.address_1', event.full_address, { shouldValidate: true });
            // eventForm.setValue('place.address_2', event.place_address_2, { shouldValidate: true });
            // eventForm.setValue('place.zipcode', event.place_zipcode, { shouldValidate: true });
            // eventForm.setValue('place.city', event.place_city, { shouldValidate: true });
            // eventForm.setValue('place.state', event.place_state, { shouldValidate: true });
            // eventForm.setValue('place.address_number', event.place_address_number, { shouldValidate: true });
        }

    }, [eventCustomer])
    console.log(eventForm.formState.errors)
    const handleCreateEvent = async (formData: Record<string, any>) => {

        const payload = getPayload(formData);

        await eventCustomerService.createEvent(payload).then((response: Record<string, any>) => {
            SessionHelper.redirectWith('/', 'eventCreated',
                `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi criado com sucesso.`
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
            is_private: formData.is_private,
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

        eventCustomer && await eventCustomerService.updateEvent(payload, eventCustomer.id).then((response: Record<string, any>) => {

            toast({ status: 'success', description: 'Alterações salvas com sucesso', position: 'top-right' })
        })
    }

    return (

        <FormProvider {...eventForm}>
            <Flex as={'form'}
                onSubmit={!event ? eventForm.handleSubmit(handleCreateEvent) : eventForm.handleSubmit(handleUpdateEvent)}
                gap={8}
                maxWidth={'100%'}
                borderRadius={'xl'}
                p={4}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                <Stack spacing={4}>
                    <FormControl isInvalid={!!eventForm?.formState?.errors?.event_image}>
                        <EventImageUpload hookForm={eventForm} />
                        <FormErrorMessage>{eventForm?.formState?.errors?.event_image?.message as string}</FormErrorMessage>
                    </FormControl>
                </Stack>
                <Stack borderWidth='1px' p='6' borderRadius='xl' flex={1} spacing={8}>

                    <Stack spacing={4}>
                        <EventInfoForm hookForm={eventForm} />
                    </Stack>
                    <Stack spacing={4}>
                        <Heading size={'md'}>Endereço</Heading>
                        <AddressForm hookForm={eventForm} />
                    </Stack>
                    <Divider />

                    <Button isLoading={eventForm.formState.isSubmitting} type={'submit'}>{!event ? 'Criar evento' : 'Atualizar'}</Button>
                </Stack>

            </Flex>
        </FormProvider>
    )
}

export default EventForm;