import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, Input, InputLabel, Stack } from "@mui/material";
import { TextField, Button, MenuItem, Select, Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateRangePicker from '@mui/lab/DateRangePicker';
import dayjs from "dayjs";

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import container from "@/container";
import { EventRepositoryInterface } from '@/interfaces';
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { eventValidator } from '@/validators';
import { now } from "moment";
import { eventPayloadResolver } from '@/helpers';
import { EventImageUpload, GoogleAutoComplete } from '@/components';


const eventService = container.get<EventRepositoryInterface>('public');

export default function EventForm() {

    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState([]);
    const [place, setPlace] = useState<any>();

    const eventHookForm = useForm({
        resolver: yupResolver(eventValidator),
    });

    const { register, watch, handleSubmit, control, formState: { errors } } = eventHookForm;

    useEffect(() => {

        eventService.categories().then((response: AxiosResponse) => {
            setCategories(response.data)
        })
    }, [])

    const onSubmit = data => {

        console.log(eventPayloadResolver(data), 'eventPayloadResolver');
    };

    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    return (

        <FormProvider {...eventHookForm}>
            <Grid container gap={6} justifyContent={'center'}>
                <Grid item>
                    <Box maxWidth={305}>
                        <EventImageUpload hookForm={eventHookForm} />
                    </Box>
                </Grid>
                <Grid item>

                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>

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
                                <Typography variant="body2" component={'p'}>
                                    O Endereço será exibido no mapa na página do evento
                                </Typography>
                            </Box>

                            <GoogleAutoComplete captureAddress={setPlace}>
                                <TextField {...register('place')} fullWidth label="Digite o endereço" />
                            </GoogleAutoComplete>

                            <Grid container gap={4}>
                                <Grid item xs={12} md={8}>
                                    <TextField {...register('place.zipcode')} fullWidth label="CEP" />
                                </Grid>
                                <Grid item xs={12} md={3.74}>
                                    <TextField {...register('place.address_number')} fullWidth label="Nº" />
                                </Grid>
                            </Grid>
                            <TextField {...register('place.name')} fullWidth label='Local' />

                        </Stack>
                        <Stack spacing={4}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Ingressos</Typography>
                                <Typography variant="body2" component={'p'}>Marque essa opção caso o evento tenha venda de ingressos </Typography>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Venda de ingressos com site parceiro" />
                            </Box>
                        </Stack>

                        <Stack spacing={6}>
                            <Box>
                                <Typography variant='h6' gutterBottom>Descrição do evento</Typography>
                                <Typography variant="body2" component={'p'}>
                                    O Endereço será exibido no mapa na página do evento
                                </Typography>
                            </Box>
                            <Controller
                                name='description'
                                control={control}
                                render={({ field }) => (

                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                            ],
                                        }}
                                    />
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
