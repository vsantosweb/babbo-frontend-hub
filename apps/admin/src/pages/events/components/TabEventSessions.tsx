import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Tab } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import SessionModalForm from './SessionModalForm'
import ActionMenu from './ActionMenu'
import useEventSession from 'src/hooks/useEventSession'
import AccordionLot from './AccordionLot'
import { FormProvider, useForm } from 'react-hook-form'
import { useDisclosure } from '@/hooks';

type EventSessionType = {
    id: number,
    name: string,
}

export default function TabEventSessions({ eventId }: { eventId: number }) {

    const [open, setOpen] = React.useState(false);
    const [selectedSession, setSelectedSession] = useState<Record<string, any>>()
    const [value, setValue] = useState<number>(1)
    const { sessions, handleCreateSession, handleUpdateSession, handleDeleteSession } = useEventSession(eventId);
    const sessionForm = useForm();
    const deleteDialogDisclosure = useDisclosure();
    const modalDisclosure = useDisclosure();

    useEffect(() => {
        if (selectedSession) {
            sessionForm.setValue('name', selectedSession.name)
        }
    }, [selectedSession])

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const addSession = async (formData: Record<string, any>) => {
        await handleCreateSession(formData).then(() => {
            modalDisclosure.onClose()
            sessionForm.reset();
        })
    }

    const updateSession = async (formData: Record<string, any>) => {
        await handleUpdateSession(formData, selectedSession?.id).then(() => {
            modalDisclosure.onClose()
            sessionForm.reset();
        })
    }

    const deleteSession = async () => {
        await handleDeleteSession(selectedSession?.id).then(() => {
            deleteDialogDisclosure.onClose()
        })
    }

    const sessionActions = [
        { label: 'Editar', action: modalDisclosure.onOpen, setSelectedSession: setSelectedSession },
        { label: 'Excluir', action: deleteDialogDisclosure.onOpen, setSelectedSession: setSelectedSession },
    ]
    return (
        <FormProvider {...sessionForm}>

            <div>
                <SessionModalForm
                    handleClickOpen={modalDisclosure.onOpen}
                    handleClose={modalDisclosure.onClose}
                    addSession={addSession}
                    updateSession={updateSession}
                    open={modalDisclosure.isOpen}
                    selectedSession={selectedSession}
                />
                <Dialog
                    open={deleteDialogDisclosure.isOpen}
                    onClose={deleteDialogDisclosure.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Deseja essa sessão?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">A sessão e todos os lotes e ingressos serão permanentemente excluídos, tem certeza?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteDialogDisclosure.onClose}>cancelar</Button>
                        <LoadingButton
                            onClick={deleteSession}
                        > Excluir
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>

            {sessions && <TabContext value={value}>
                <TabList variant='scrollable' onChange={handleChange}>
                    {sessions?.map((session, index) => <Tab
                        key={index}
                        value={session.id}
                        icon={<ActionMenu element={session} actions={sessionActions} />}
                        iconPosition='end'
                        label={session.name} />)}
                </TabList>
                {
                    sessions?.map((session, index) => <TabPanel key={index} value={session.id as never}>
                        <Stack spacing={4}>
                            <AccordionLot session={session} eventId={eventId} />
                        </Stack>
                    </TabPanel>
                    )}
            </TabContext>}
        </FormProvider>
    )
}
