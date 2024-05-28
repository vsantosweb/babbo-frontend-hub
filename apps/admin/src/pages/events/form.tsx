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
import { eventValidatorSchema } from '@/validators';
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

export default function EventForm({ event }: { event?: Record<string, any> }) {


    const [categories, setCategories] = useState([]);
    const [customers, setCustomers] = useState<Record<string, any>[]>([]);
    const [customer, setCustomer] = useState<Record<string, any>>();
    const [place, setPlace] = useState<any>();

    const eventValidation = Yup.object().shape({ ...eventValidatorSchema, customer_id: Yup.number().required('Campo obrigatório') })

    const eventHookForm = useForm({
        resolver: yupResolver(eventValidation),
    });

    const { register, watch, handleSubmit, setValue, getValues, control, formState: { errors } } = eventHookForm;

    const address = place?.address_components;


    useEffect(() => {

        if (event) {

            setCustomer(customers.filter(customer => customer.id === event?.customer_id)[0]);
            const startDate: any = moment(event.start_date).format("YYYY-MM-DD HH:mm");
            const endDate: any = moment(event.end_date).format("YYYY-MM-DD HH:mm");

            setValue('customer_id', event?.customer_id, { shouldValidate: true });
            setValue('name', event?.name, { shouldValidate: true });
            setValue('description', event.description, { shouldValidate: true });
            setValue('event_image', event.event_image, { shouldValidate: true });
            setValue('has_external_ticket', event.has_external_ticket, { shouldValidate: true });
            setValue('ticket_partner_name', event.ticket_partner_name, { shouldValidate: true });
            setValue('ticket_partner_url', event.ticket_partner_url, { shouldValidate: true });
            setValue('start_date', startDate, { shouldValidate: true });
            setValue('end_date', endDate, { shouldValidate: true });
            setValue('category', event.category, { shouldValidate: true })
            setValue('place.full_address', event.place.formatted_address, { shouldValidate: true });
            setValue('place.name', event.place.name, { shouldValidate: true });
            setValue('place.address_1', event.place.address_1, { shouldValidate: true });
            setValue('place.address_2', event.place.address_2, { shouldValidate: true });
            setValue('place.zipcode', event.place.zipcode, { shouldValidate: true });
            setValue('place.city', event.place.city, { shouldValidate: true });
            setValue('place.state', event.place.state, { shouldValidate: true });
            setValue('place.address_number', event.place.address_number, { shouldValidate: true });
        }

    }, [event])

    useEffect(() => {
        if (address?.length > 0) {
            setValue('place.zipcode', address[6]?.long_name || '', { shouldValidate: true });
            setValue('place.address_1', address[1]?.long_name || '', { shouldValidate: true });
            setValue('place.address_2', address[2]?.long_name || '', { shouldValidate: true });
            setValue('place.city', address[3]?.long_name || '', { shouldValidate: true });
            setValue('place.name', place.name || '', { shouldValidate: true });
            setValue('place.state', address[4]?.short_name || '', { shouldValidate: true });
            setValue('place.address_number', address[0]?.long_name || '', { shouldValidate: true });
            setValue('place.geolocation', `${place?.geometry?.location?.lat()}, ${place?.geometry?.location?.lng()}`)
        }
    }, [address, setValue]);

    useEffect(() => {

        eventService.categories().then((response: AxiosResponse) => {
            setCategories(response.data)
        })

    }, [])

    useEffect(() => {
        adminCustomerService.get().then((response: AxiosResponse) => {
            const customerData = response.data.map((customer: Record<string, any>) => {
                return { id: customer.id, label: customer.name }
            })

            setCustomers(customerData);

            if (event) {
                setCustomer(customerData.filter(customer => customer.id === event?.customer_id)[0]);
            }

        });
    }, [])

    useEffect(() => {

        if (event) {
            setCustomer(customers.filter(customer => customer.id === event?.customer_id)[0]);
        }
    }, [customers]);

    const handleCreateEvent = async (formData: Record<string, any>) => {

        const payload = eventPayloadResolver(formData);

        await adminEventService.create({ ...payload, customer_id: formData.customer_id }).then((response: Record<string, any>) => {
            SessionHelper.redirectWith('/events', 'eventCreated',
                `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi criado com sucesso. Vamos fazer uma análise e disponibiliza-lo na plataforma em até 24h.`
            );
        })

    }
    console.log(customer)
    const handleUpdateEvent = async (formData: Record<string, any>) => {

        const payload = eventPayloadResolver(formData);

        // await eventCustomerService.updateEvent(payload, event?.id).then((response: Record<string, any>) => {

        //     SessionHelper.redirectWith('/', 'eventUpdated',
        //         `O evento  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi atualizado.`
        //     );

        // })
    }

    if(event && !customer) return null;
    
    return (

        <FormProvider {...eventHookForm}>
            <Grid container gap={6} justifyContent={'center'}>
                <Grid item>
                    <Box maxWidth={305}>
                        <FormControl error={!!errors.event_image}>
                            <EventImageUpload hookForm={eventHookForm} />
                            <FormHelperText>{errors.event_image?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item>

                    <Stack component="form"
                        onSubmit={!event ? eventHookForm.handleSubmit(handleCreateEvent) : eventHookForm.handleSubmit(handleUpdateEvent)}
                        spacing={6}
                    >
                        <Autocomplete
                            fullWidth
                            options={customers}
                            defaultValue={customer}
                            onChange={(_, item: any) => setValue('customer_id', item?.id, { shouldValidate: true })}
                            renderInput={(params) => <TextField
                                {...params}
                                label="Organizador"
                                error={!!errors.customer_id}
                                helperText={errors.customer_id ? errors.customer_id.message : ''}
                            />
                            }
                        />

                        <Divider />
                        <Stack spacing={6} >
                            <Box>
                                <Typography mb={0} variant='h6' gutterBottom>Qual o nome do evento?</Typography>
                                <Typography variant="body2" component={'p'}>
                                    Este será o título do seu evento. Seu título será usado para ajudar
                                    nas buscas do site, seja especifico e criativo!
                                </Typography>
                            </Box>
                            <TextField
                                {...register('name')}
                                fullWidth
                                label="Nome do evento"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                        </Stack>

                        <Stack>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Categoria do evento</InputLabel>
                                <Select
                                    {...register('category')}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Categoria do evento"
                                    error={!!errors.category}
                                    defaultValue=""
                                >
                                    {categories.map((category, index) => <MenuItem key={index} value={category.name}>{category.name}</MenuItem>)}
                                </Select>
                                {errors.category && <FormHelperText error={!!errors.category}>{errors.category.message}</FormHelperText>}
                            </FormControl>
                        </Stack>

                        <Stack spacing={2}>
                            <Box>
                                <Typography mb={0} variant='h6' gutterBottom>Data do evento</Typography>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack gap={4} width={'100%'} flexDirection={'row'}>
                                    <FormControl fullWidth error={!!errors.start_date}>
                                        <Controller
                                            name='start_date'
                                            control={control}
                                            render={({ field }) => (
                                                <DateTimePicker
                                                    ampm={false}
                                                    minDate={dayjs()}
                                                    label="Data e Hora"
                                                    onChange={field.onChange}
                                                    viewRenderers={{ hours: null }}
                                                />
                                            )}
                                        />
                                        {errors.start_date && <FormHelperText>{errors.start_date.message}</FormHelperText>}
                                    </FormControl>
                                    <FormControl fullWidth error={!!errors.end_date}>
                                        <Controller
                                            name='end_date'
                                            control={control}
                                            render={({ field }) => (
                                                <DateTimePicker
                                                    ampm={false}
                                                    minDate={dayjs(watch('start_date'))}
                                                    label="Data e Hora"
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.end_date && <FormHelperText>{errors.end_date.message}</FormHelperText>}
                                    </FormControl>
                                </Stack>
                            </LocalizationProvider>
                        </Stack>

                        <Stack spacing={6}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Localização do evento</Typography>
                                <Typography variant="body2">
                                    O Endereço será exibido no mapa na página do evento
                                </Typography>
                            </Box>

                            <GoogleAutoComplete captureAddress={setPlace}>
                                <TextField
                                    {...register('place.full_address')}
                                    fullWidth
                                    label="Digite o endereço"
                                    error={!!errors.place?.full_address}
                                    helperText={errors.place?.full_address ? errors.place?.full_address.message : ''}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><FaSearch color="" /></InputAdornment>,
                                    }}
                                />
                            </GoogleAutoComplete>
                            <input type={'hidden'} {...register('place.geolocation')} />

                            {getValues('place.full_address') && <>
                                <Grid container gap={4}>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            {...register('place.zipcode')}
                                            fullWidth
                                            label="CEP"
                                            error={!!errors.place?.zipcode}
                                            helperText={errors.place?.zipcode ? errors.place?.zipcode.message : ''}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3.74}>
                                        <TextField
                                            {...register('place.address_number')}
                                            fullWidth
                                            label="Nº"
                                            error={!!errors.place?.address_number}
                                            helperText={errors.place?.address_number ? errors.place?.address_number.message : ''}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    {...register('place.name')}
                                    fullWidth label='Nome do local'
                                    error={!!errors.place?.name}
                                    helperText={errors.place?.name ? errors.place?.name.message : ''}

                                />
                            </>}

                        </Stack>

                        <Stack spacing={4}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Ingressos</Typography>
                                <Typography variant="body2" component={'p'}>Marque essa opção caso o evento tenha venda de ingressos </Typography>
                                <FormControlLabel control={<Checkbox {...register('has_external_ticket')} checked={watch('has_external_ticket')} />} label="Venda de ingressos com site parceiro" />
                            </Box>
                            {watch('has_external_ticket') && <>
                                <TextField
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><IoTicket fontSize={'1.3em'} color="" /></InputAdornment>,
                                    }}
                                    {...register('ticket_partner_name')}
                                    fullWidth
                                    label="Empresa fornecedora"
                                    error={!!errors.ticket_partner_name}
                                    helperText={errors.ticket_partner_name ? errors.ticket_partner_name.message : ''}
                                />
                                <TextField
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><FaExternalLinkAlt color="" /></InputAdornment>,
                                    }}
                                    {...register('ticket_partner_url')}
                                    fullWidth
                                    label="Link para compra dos ingressos"
                                    error={!!errors.ticket_partner_url}
                                    helperText={errors.ticket_partner_url ? errors.ticket_partner_url.message : ''}
                                />
                            </>}
                        </Stack>

                        <Stack spacing={6}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Descrição do evento</Typography>
                                <Typography variant="body2">
                                    Descreva detalhes importantes sobre o evento
                                </Typography>
                            </Box>
                            <Controller
                                name='description'
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill {...field} theme="snow" value={field?.value as string} onChange={(value: any) => field.onChange(value)} />
                                )}
                            />
                        </Stack>

                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Button type={'submit'} variant='contained'>Criar evento</Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>

    );
}
