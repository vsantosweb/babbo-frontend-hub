import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
    HStack,
    Divider,
    Checkbox,
    FormErrorMessage
} from '@chakra-ui/react'

import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from 'yup';

import Layout from '@/layouts'
import AddressForm from '../forms/address-form';
import EventInfoForm from '../forms/event-info-form';
import { EventImageUpload, GoogleAutoComplete } from '@/components';
import { SessionHelper } from '@/helpers';
import DateForm from '../forms/date-form';
import SponsoredForm from '../forms/sponsored-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventValidatorSchema, addressValidatorSchema } from '../../../validators';
import { EventInterface, EventPayloadType } from '@/types';
import { EventProvider, useEvent } from '@/hooks';
import { redirect } from 'next/dist/server/api-utils';

export default function EventForm() {
    return (
        <Layout name='manager'>
            <EventProvider>
                <Form />
            </EventProvider>
        </Layout>

    )
}


const Form = () => {

    const validationSchema = Yup.object().shape({ ...eventValidatorSchema });

    const { createEvent } = useEvent();

    const eventForm = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });


    const handleCreateEvent = async (formData: { [index: string]: any }) => {

        const payload = {
            name: formData.name,
            place: formData.place,
            start_date: formData.start_date,
            end_date: formData.end_date,
            categories: formData.categories.map((x: { value: string }) => x.value),
            event_image: formData.event_image
        }

        await createEvent(payload).then((response: { value: string }) => {

            console.log(response, 'response')
            SessionHelper.redirectWith('/', 'eventCreated');

        })

    }

    return (

        <Flex as={'form'} m={'auto'} onSubmit={eventForm.handleSubmit(handleCreateEvent)} gap={4} width={'100%'}>
            <Stack spacing={4}>
                <FormControl isInvalid={!!eventForm?.formState?.errors?.event_image}>
                    <EventImageUpload hookForm={eventForm} />
                    <FormErrorMessage>{eventForm?.formState?.errors?.event_image?.message as string}</FormErrorMessage>
                </FormControl>
            </Stack>

            <Stack flex={1} spacing={6}>

                <Stack spacing={4}>
                    <Heading size={'md'}>Endereço</Heading>
                    <AddressForm hookForm={eventForm} />
                </Stack>

                <Divider />

                <Stack spacing={4}>
                    <Heading size={'md'}>Informações do evento</Heading>
                    <EventInfoForm hookForm={eventForm} />
                </Stack>

                <Stack spacing={4}>
                    <Checkbox defaultChecked>Tornar esse evento destaque?</Checkbox>
                    <Heading size={'md'}>Exposiçao</Heading>
                    <SponsoredForm />
                </Stack>

                <HStack justifyContent={'flex-end'}>
                    {/* <Button variant={'outline'}>visualizar</Button> */}
                    <Button isLoading={eventForm.formState.isSubmitting} type={'submit'}>Criar evento</Button>
                </HStack>
            </Stack>
        </Flex>
    )
}
