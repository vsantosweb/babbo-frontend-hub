import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { DatePicker, LoadingButton } from '@mui/lab';
import { FormControl, FormHelperText, Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function LotModalForm({ addSession, updateSession, handleClickOpen, handleClose, open, selectedSession }: any) {

    const { register, getValues, watch, control, handleSubmit, formState: { isSubmitting, errors } } = useFormContext();

    return (
        <React.Fragment>
            <Button sx={{ mb: 4 }} variant={'outlined'} onClick={handleClickOpen}>Adicionar lote</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                component={'form'}
                onSubmit={!selectedSession ? handleSubmit(addSession) : handleSubmit(updateSession)}
            >
                <DialogTitle>{selectedSession ? 'Editar lote' : 'Criar lote'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Os lotes servirão para gerenciar os seus ingressos
                    </DialogContentText>
                    <TextField
                        {...register('name')}
                        autoFocus
                        required
                        margin="dense"
                        placeholder='1° lote - AREA VIP'
                        label="Nome do lote"
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack gap={4} width={'100%'} flexDirection={'row'}>
                            <FormControl fullWidth error={!!errors.start_date}>
                                <Controller
                                    name='start_date'
                                    control={control}
                                    render={({ field }) => (
                                        <DateTimePicker
                                            defaultValue={dayjs(getValues('start_date'))}
                                            ampm={false}
                                            format='DD/MM/YYYY'
                                            minDate={dayjs()}
                                            label="Início das vendas"
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {/* {errors.start_date && <FormHelperText>{errors.start_date.message}</FormHelperText>} */}
                            </FormControl>
                            <FormControl fullWidth error={!!errors.end_date}>
                                <Controller
                                    name='end_date'
                                    control={control}
                                    render={({ field }) => (
                                        <DateTimePicker
                                            ampm={false}
                                            format='DD/MM/YYYY'
                                            defaultValue={dayjs(getValues('start_date'))}
                                            minDate={dayjs(watch('start_date'))}
                                            label="Término das Vendas"
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                {/* {errors.end_date && <FormHelperText>{errors.end_date.message}</FormHelperText>} */}
                            </FormControl>

                        </Stack>
                    </LocalizationProvider>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <LoadingButton
                        loading={isSubmitting}
                        variant={'contained'}
                        type='submit'
                    >
                        {selectedSession ? 'Salvar' : 'Criar lote'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
