import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormContext } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

export default function SessionModalForm({ addSession, updateSession, handleClickOpen, handleClose, open, selectedSession }: any) {

    const { register, handleSubmit, formState: { isSubmitting } } = useFormContext();

    return (
        <React.Fragment>
            <Button variant={'contained'} onClick={handleClickOpen}>
                Adicionar sessão
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                component={'form'}
                onSubmit={!selectedSession ? handleSubmit(addSession) : handleSubmit(updateSession) }
            >
                <DialogTitle>{selectedSession ? 'Editar sessão' : 'Criar sessão'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use as sessões para poder organizar melhor a distribuição dos
                        ingressos caso haja mais dias de eventos ou um numero elevado de lotes
                    </DialogContentText>
                    <TextField
                        {...register('name')}
                        autoFocus
                        required
                        margin="dense"
                        label="Nome da sessão"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <LoadingButton
                        loading={isSubmitting}
                        variant={'contained'}
                        type='submit'
                    >
                        {selectedSession ? 'Salvar' : 'Criar sessão'}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
