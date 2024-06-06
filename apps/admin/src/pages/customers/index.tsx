import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import Link from 'next/link'
import { AdminCustomertRepositoryInterface } from '@/interfaces';
import container from '@/container'
import CustomerTable from './components/CustomerTable'
import { CiSearch } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import Close from 'mdi-material-ui/Close'

const adminCustomerService = container.get<AdminCustomertRepositoryInterface>('admin-customer');

type CountSummary = {
    label: string
    status: string,
    count: number,
}

const columns = [
    { id: 'event', label: 'Evento', },
    { id: 'category', label: 'Categoria', },
    { id: 'created_at', label: 'Criado em', },
    { id: 'updated_at', label: 'Ultima atualização', },
    { id: 'status', label: 'Status', },
    { id: 'end_date', label: 'Ativo/Expirado' },
    { id: 'action', label: 'action', },
]


export default function Events() {

    const [events, setEvents] = useState<Record<string, any>>();
    const [eventFilter, setEventFilter] = useState<Record<string, any> | null>();
    const [countSummary, setCountSummary] = useState<CountSummary[]>();
    const { register, handleSubmit, reset } = useForm();


    // const fetchData = async (page?: number, rowsPerPage?: number) => {
    const fetchData = async (params: Record<string, any>) => {

        adminCustomerService.get(params).then((response: Record<string, any>) => {
            setEvents(response)
        })
    };

    const handleDelete = (id: number) => {
        return adminCustomerService.destroy(id)
    }

    const handleSearch = (formData: Record<string, any>) => {
        setEventFilter({ ...formData, skip: 0 });
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Organizadores' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <Box
                            component={'form'}
                            justifyContent={'flex-end'}
                            gap={5}
                            onSubmit={handleSubmit(handleSearch)}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <TextField
                                {...register('name')}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton type={'submit'} sx={{ paddingRight: 0 }} aria-label="search">
                                            <CiSearch color="" />
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                size='small'
                                label="Procurar cliente"
                            />
                            {eventFilter && <Button endIcon={<Close />} onClick={() => [setEventFilter(null), reset()]}>Limpar filtro</Button>}
                            <Box >
                                <Button LinkComponent={Link} href='/customers/create' variant="contained" color="primary">Adicionar cliente</Button>
                            </Box>
                        </Box>
                    </CardContent>

                    <CustomerTable
                        fetchData={fetchData}
                        rows={events}
                        filters={eventFilter}
                        handleDeleteItem={handleDelete}
                        columns={columns}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}
