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

import AddressForm from '../forms/address-form';
import EventInfoForm from '../forms/event-info-form';
import { EventImageUpload } from '@/components';
import { SessionHelper } from '@/helpers';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventValidatorSchema } from '../../validators';
import { EventPayloadType } from '@/types';
import { useEffect } from 'react';
import moment from 'moment';
import container from '@/container';
import { MangerEventRepositoryInterface } from '@/interfaces';
import SponsoredForm from './sponsored-form';
import TicketForm from './ticket-form';

const eventManagerService = container.get<MangerEventRepositoryInterface>('event-manager');

const EventForm = ({ event }: { event?: Record<string, any> }) => {

    const validationSchema = Yup.object().shape({ ...eventValidatorSchema });

    const eventForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

    useEffect(() => {

        if (event) {

            const startDate: any = moment(event.start_date).format("YYYY-MM-DD HH:mm");
            const endDate: any = moment(event.end_date).format("YYYY-MM-DD HH:mm");

            eventForm.setValue('name', event?.name, { shouldValidate: true });
            eventForm.setValue('description', event.description, { shouldValidate: true });
            eventForm.setValue('event_image', event.event_image, { shouldValidate: true });
            eventForm.setValue('start_date', startDate, { shouldValidate: true });
            eventForm.setValue('end_date', endDate, { shouldValidate: true });
            eventForm.setValue('categories', event.categories.map((x: Record<string, any>) => ({ value: x.id, label: x.name })), { shouldValidate: true })
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

        return console.log(formData, 'formDataformData')
        const payload: EventPayloadType = {
            name: formData.name,
            place: formData.place,
            start_date: moment(formData.start_date).format('YYYY-MM-DD HH:mm'),
            end_date: moment(formData.end_date).format('YYYY-MM-DD HH:mm'),
            categories: formData.categories.map((x: { value: string }) => x.value),
            description: formData.description,
            event_image: formData.event_image
        }

        await eventManagerService.createEvent(payload).then((response: Record<string, any>) => {
            SessionHelper.redirectWith('/', 'eventCreated', response.data);
        })

    }

    const handleUpdateEvent = async (formData: Record<string, any>) => {

        const payload: EventPayloadType = {
            name: formData.name,
            place: formData.place,
            start_date: moment(formData.start_date).format('YYYY-MM-DD HH:mm'),
            end_date: moment(formData.end_date).format('YYYY-MM-DD HH:mm'),
            description: formData.description,
            categories: formData.categories.map((x: { value: string }) => x.value),
        }

        if (formData.image) payload.event_image = formData.event_image;

        await eventManagerService.updateEvent(payload, event?.id).then((response: { value: string }) => {
            SessionHelper.redirectWith(`/events/${event?.uuid}/edit`, 'eventUpdated');
        })
    }

    return (

        <FormProvider {...eventForm}>
            <Flex as={'form'}
                onSubmit={!event ? eventForm.handleSubmit(handleCreateEvent) : eventForm.handleSubmit(handleUpdateEvent)}
                gap={4}
                width={'100%'}
            >
                <Stack spacing={4}>
                    <FormControl isInvalid={!!eventForm?.formState?.errors?.event_image}>
                        <EventImageUpload hookForm={eventForm} />
                        <FormErrorMessage>{eventForm?.formState?.errors?.event_image?.message as string}</FormErrorMessage>
                    </FormControl>
                </Stack>

                <Stack flex={1} spacing={8}>

                    <Stack spacing={4}>
                        <Heading size={'lg'}>Endereço</Heading>
                        <AddressForm hookForm={eventForm} />
                    </Stack>


                    <Stack spacing={4}>
                        <Heading size={'lg'}>Informações do evento</Heading>
                        <EventInfoForm hookForm={eventForm} />
                    </Stack>

                    <Stack>
                        <TicketForm />
                    </Stack>
                    <HStack justifyContent={'flex-end'}>
                        {/* <Button variant={'outline'}>visualizar</Button> */}
                        <Button isLoading={eventForm.formState.isSubmitting} type={'submit'}>{!event ? 'Criar evento' : 'Atualizar'}</Button>
                    </HStack>
                </Stack>
            </Flex>
        </FormProvider>
    )
}

export default EventForm;