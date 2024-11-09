import { SyntheticEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoArrowForward } from 'react-icons/io5';
import { AccordionActions, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { LuMoreVertical } from 'react-icons/lu';
import ActionMenu from './ActionMenu';
import TicketTable from './TicketTable';
import { useDisclosure } from '@/hooks';
import LotModalForm from './LotModalForm';
import useEventSession from 'src/hooks/useEventSession';
import { useForm } from 'react-hook-form';
import useTicketLot from 'src/hooks/useTicketLot';
import moment from 'moment';



const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<IoArrowForward />}
        {...props}
    />
))(({ theme }) => ({

    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(3),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AccordionLot({ session, eventId }: any) {
    
    const [expanded, setExpanded] = useState<number | false>(false);
    const modalDisclosure = useDisclosure();
    const deleteDialogDisclosure = useDisclosure();
    const [selectedLot, setSelectedLot] = useState<Record<string, any>>()
    const { handleCreateLot, handleUpdateLot, handleDeleteLot, lots } = useTicketLot(session?.id, eventId);
    const sessionForm = useForm();

    useEffect(() => {
        if (selectedLot) {
            sessionForm.setValue('name', selectedLot.name)
        }
    }, [selectedLot])

    const addSession = async (formData: Record<string, any>) => {

        const data = {
            ...formData,
            start_date: moment(formData?.start_date).format('YYYY-MM-DD HH:mm'),
            end_date: moment(formData?.end_date).format('YYYY-MM-DD HH:mm'),
            sale_type: 'lot',
        }
        await handleCreateLot(data).then(() => {
            modalDisclosure.onClose()
            sessionForm.reset();
        })
    }

    const updateSession = async (formData: Record<string, any>) => {
        await handleUpdateLot(formData, eventId, selectedLot?.id).then(() => {
            modalDisclosure.onClose()
            sessionForm.reset();
        })
    }

    const deleteSession = async (lotId: number) => {
        await handleDeleteLot(eventId, selectedLot?.id, lotId).then(() => {
            deleteDialogDisclosure.onClose()
        })
    }

    const handleChange =
        (panel: number) => (event: SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const LotActions = [
        { label: 'Editar', action: modalDisclosure.onOpen, setSelectedLot: setSelectedLot },
        { label: 'Excluir', action: deleteDialogDisclosure.onOpen, setSelectedLot: setSelectedLot },
    ]

    return (
        <div>
            <LotModalForm
                handleClickOpen={modalDisclosure.onOpen}
                handleClose={modalDisclosure.onClose}
                addSession={addSession}
                updateSession={updateSession}
                open={modalDisclosure.isOpen}
                selectedLot={selectedLot}
            />
            {session?.ticket_batches?.map((lot, index) => {
                return <Accordion key={index} expanded={index === expanded} onChange={handleChange(index)}>
                    <AccordionSummary aria-controls={index} id={index}>
                        <Typography sx={{ flex: 1, alignContent: 'center' }}>{lot.name}</Typography>
                        <ActionMenu />
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <TicketTable
                        fetchData={console.log}
                        handleDeleteEvent={console.log}
                        columns={[
                            { id: 'name', label: 'Nome', },
                            { id: 'ticket_type', label: 'Tipo de ingresso', },
                            { id: 'created_at', label: 'Criado em', },
                            { id: 'updated_at', label: 'Ultima atualização', },
                            { id: 'status', label: 'Status', },
                            { id: 'end_date', label: 'Ativo/Expirado' },
                            { id: 'action', label: 'action', },
                        ]}
                        rows={[
                            {
                                "id": 1,
                                "event_ticket_batch_id": 1,
                                "name": "Homem",
                                "ticket_type": "paid",
                                "quantity": 100,
                                "min_quantity": 1,
                                "max_quantity": 10,
                                "price": 150,
                                "tax": 15,
                                "code": "VIP123",
                                "sales_quantity": 0,
                                "sold_out": 0,
                                "sold_at": null,
                                "description": "Ingressos VIP para o festival, incluindo acesso a áreas exclusivas e brindes.",
                                "created_at": "2024-06-12 22:01:14",
                                "updated_at": "2024-06-12 22:01:14"
                            },
                            {
                                "id": 1,
                                "event_ticket_batch_id": 1,
                                "name": "Mulher",
                                "ticket_type": "paid",
                                "quantity": 100,
                                "min_quantity": 1,
                                "max_quantity": 10,
                                "price": 150,
                                "tax": 15,
                                "code": "VIP123",
                                "sales_quantity": 0,
                                "sold_out": 0,
                                "sold_at": null,
                                "description": "Ingressos VIP para o festival, incluindo acesso a áreas exclusivas e brindes.",
                                "created_at": "2024-06-12 22:01:14",
                                "updated_at": "2024-06-12 22:01:14"
                            },
                            {
                                "id": 1,
                                "event_ticket_batch_id": 1,
                                "name": "Área VIP",
                                "ticket_type": "paid",
                                "quantity": 100,
                                "min_quantity": 1,
                                "max_quantity": 10,
                                "price": 150,
                                "tax": 15,
                                "code": "VIP123",
                                "sales_quantity": 0,
                                "sold_out": 0,
                                "sold_at": null,
                                "description": "Ingressos VIP para o festival, incluindo acesso a áreas exclusivas e brindes.",
                                "created_at": "2024-06-12 22:01:14",
                                "updated_at": "2024-06-12 22:01:14"
                            }
                        ]} /> */}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button>Adicionar ingresso</Button>
                    </AccordionActions>
                </Accordion>
            })}


        </div>
    );
}
