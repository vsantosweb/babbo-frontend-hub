import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, IconButton, InputAdornment, TextField } from '@mui/material'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import { AdminCustomertRepositoryInterface, AdminEventRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';
import container from '@/container'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import EventTable from './components/CustomerTable'
import { CiSearch } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import Close from 'mdi-material-ui/Close'
import { CalendarIcon } from '@chakra-ui/icons'


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

    const handleDeleteEvent = (id: number) => {
        return adminCustomerService.destroy(id)
    }

    const handleEventSearch = (formData: Record<string, any>) => {
        setEventFilter({ ...formData, skip: 0 });
    }

    // const summaryCards = (
    //     countSummary && countSummary?.map((summary, key) =>
    //         <Grid item xs={12} md={3} key={key}>
    //             <Card>   
    //                 <CardContent>
    //                     <Box display={'flex'} justifyContent={'space-between'}>
    //                         <Box>
    //                             <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{summary.label}</Typography>
    //                             <Typography variant="h5" component="div">
    //                             </Typography>
    //                             <Typography sx={{ mb: 1.5 }} variant='h4' color="text.primary"> {summary.count} </Typography>
    //                             <Typography variant="body2">No sistema</Typography>
    //                         </Box>
    //                         <Avatar sx={{ color: 'primary.main' }}><CalendarIcon /></Avatar>
    //                     </Box>
    //                 </CardContent>
    //             </Card>
    //         </Grid>
    //     )
    // )
    return (
        <Grid container spacing={6}>
            {/* {summaryCards} */}
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Organizadores' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <Box
                            component={'form'}
                            justifyContent={'flex-end'}
                            gap={5}
                            onSubmit={handleSubmit(handleEventSearch)}
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

                    <EventTable
                        fetchData={fetchData}
                        rows={events}
                        filters={eventFilter}
                        handleDeleteEvent={handleDeleteEvent}
                        columns={columns}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}
