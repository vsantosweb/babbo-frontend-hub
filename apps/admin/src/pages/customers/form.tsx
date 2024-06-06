import { Checkbox, FormControlLabel, FormHelperText, Grid, InputAdornment, InputLabel, Stack } from "@mui/material";
import { TextField, Button, Box, Typography } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import container from "@/container";
import { AdminCustomertRepositoryInterface } from '@/interfaces';
import { useEffect, useState } from "react";
import { customerValidatorSchema, eventValidatorSchema } from '@/validators';
import { SessionHelper, customerPayloadResolver } from '@/helpers';


const adminCustomerService = container.get<AdminCustomertRepositoryInterface>('admin-customer');

export default function CustomerForm({ customer }: { customer?: Record<string, any> }) {

    const buttonActionText: string = !customer ? 'Cadastrar cliente' : 'Atualizar cliente';

    const validation = Yup.object().shape({ ...customerValidatorSchema })

    const hookForm = useForm({
        resolver: yupResolver(validation),
    });

    const { register, watch, handleSubmit, setValue, getValues, control, formState: { errors } } = hookForm;

    useEffect(() => {
        console.log(customer, 'customer')
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

    const handleCreateCustomer = async (formData: Record<string, any>) => {

        const payload = customerPayloadResolver(formData);

        await adminCustomerService.create(payload)
            .then((response: Record<string, any>) => {
                SessionHelper.redirectWith('/customers', 'customerCreated',
                    `O cliente  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi criado com sucesso`
                );
            })

    }
    const handleUpdateCustomer = async (formData: Record<string, any>) => {

        const payload = customerPayloadResolver(formData);

        await adminCustomerService.update(payload, customer?.id)
            .then((response: Record<string, any>) => {
                SessionHelper.redirectWith('/customers', 'customerUpdated',
                    `O cliente  <a href="/events/${response.data.uuid}/details">${response.data.name}</a> foi atualizado.`
                );
            })
    }
    return (

        <FormProvider {...hookForm}>
            <Grid container gap={6} justifyContent={'center'}>
                <Grid md={12} xs={12} item>

                    <Stack
                        component="form"
                        onSubmit={!customer ? hookForm.handleSubmit(handleCreateCustomer) : hookForm.handleSubmit(handleUpdateCustomer)}
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
                                <FormControlLabel control={<Checkbox {...register('is_organizer')} checked={!!watch('is_organizer')} />} label="Organizador de eventos?" />
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
