import { Autocomplete, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, InputLabel, Stack } from "@mui/material";
import { TextField, Button, MenuItem, Select, Box, Typography } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from "dayjs";

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import container from "@/container";
import { AdminCustomertRepositoryInterface, AdminEventRepositoryInterface, EventRepositoryInterface } from '@/interfaces';
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { customerValidatorSchema, eventValidatorSchema } from '@/validators';
import moment from "moment";
import { SessionHelper, eventPayloadResolver } from '@/helpers';
import { EventImageUpload, GoogleAutoComplete } from '@/components';
import dynamic from "next/dynamic";
import { IoTicket } from "react-icons/io5";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const eventService = container.get<EventRepositoryInterface>('public');
const adminCustomerService = container.get<AdminCustomertRepositoryInterface>('admin-customer');
const adminEventService = container.get<AdminEventRepositoryInterface>('admin-event');

export default function EventForm({ customer }: { customer?: Record<string, any> }) {


    const [categories, setCategories] = useState([]);
    const [customers, setCustomers] = useState<Record<string, any>[]>([]);
    const [place, setPlace] = useState<any>();

    const buttonActionText: string = !customer ? 'Cadastrar cliente' : 'Atualizar cliente';

    const eventValidation = Yup.object().shape({ ...customerValidatorSchema })

    const eventHookForm = useForm({
        resolver: yupResolver(eventValidation),
    });

    const { register, watch, handleSubmit, setValue, getValues, control, formState: { errors } } = eventHookForm;

    const address = place?.address_components;

    console.log(errors, 'errors!!')
    useEffect(() => {

        if (customer) {
            setValue('name', customer?.name, { shouldValidate: true });
            setValue('email', customer?.email, { shouldValidate: true });
            setValue('phone', customer.phone, { shouldValidate: true });
            setValue('is_organizer', customer.is_organizer, { shouldValidate: true });
            setValue('organizer_name', customer.organizer_name, { shouldValidate: true });
            setValue('organizer_email', customer.organizer_email, { shouldValidate: true });
            setValue('organizer_instagram', customer.organizer_instagram, { shouldValidate: true });
        }
    }, [customer])

    const handleCreateEvent = async (formData: Record<string, any>) => {

        const payload = eventPayloadResolver(formData);

        await adminEventService.create({ ...payload, customer_id: formData.customer_id })
            .then((response: Record<string, any>) => {
                SessionHelper.redirectWith('/events', 'eventCreated',
                    `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi criado com sucesso`
                );
            })

    }
    const handleUpdateEvent = async (formData: Record<string, any>) => {

        const payload = eventPayloadResolver(formData);

        await adminEventService.update({ ...payload, customer_id: formData.customer_id }, customer?.id)
            .then((response: Record<string, any>) => {
                SessionHelper.redirectWith('/events', 'eventUpdated',
                    `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi atualizado.`
                );
            })
    }

    if (event && !customer) return null;

    return (

        <FormProvider {...eventHookForm}>
            <Grid container gap={6} justifyContent={'center'}>
                <Grid md={12} xs={12} item>

                    <Stack
                        component="form"
                        onSubmit={!event ? eventHookForm.handleSubmit(handleCreateEvent) : eventHookForm.handleSubmit(handleUpdateEvent)}
                        spacing={6}
                    >

                        <Stack spacing={6} >

                            <TextField
                                {...register('name')}
                                fullWidth
                                label="Nome do cliente"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                            <TextField
                                {...register('email')}
                                fullWidth
                                label="Email"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                            <TextField
                                {...register('phone')}
                                fullWidth
                                label="Telefonte/WhatsApp"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                        </Stack>


                        <Stack spacing={4}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Perfil de organizador</Typography>
                                <Typography variant="body2" component={'p'}>Marque essa opção para configurar o perfil de organizador</Typography>
                                <FormControlLabel control={<Checkbox {...register('is_organizer')} checked={watch('is_organizer')} />} label="Organizador de eventos?" />
                            </Box>
                            {!!watch('is_organizer') && <>
                                <TextField
                                    {...register('organizer_name')}
                                    fullWidth
                                    label="Nome do organizador"
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                                <TextField
                                    {...register('organizer_email')}
                                    fullWidth
                                    label="Email do organizador"
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                                <TextField
                                    {...register('organizer_instagram')}
                                    fullWidth
                                    label="Perfil no instagram"
                                    error={!!errors.name}
                                    placeholder="@johndoe"
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                            </>}
                        </Stack>

                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Button type={'submit'} variant='contained'>{buttonActionText}</Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>

    );
}
