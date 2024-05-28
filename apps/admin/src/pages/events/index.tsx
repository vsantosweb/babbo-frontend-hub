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

import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, FormControl, InputLabel, TextField } from '@mui/material'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'


const card = (
    <React.Fragment>
        <CardContent>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Total de eventos</Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant='h4' color="text.primary"> 5254 </Typography>
                    <Typography variant="body2">No sistema</Typography>
                </Box>
                <Avatar color={'text.secondary'}><FaUserCircle /></Avatar>
            </Box>
        </CardContent>
    </React.Fragment>
);

export default function Organizers() {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={3}>
                <Card variant="outlined">{card}</Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card variant="outlined">{card}</Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card variant="outlined">{card}</Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card variant="outlined">{card}</Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Eventos' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <Box justifyContent={'flex-end'} gap={5} display={'flex'} alignItems={'center'}>
                            <TextField id="outlined-basic" label="Procurar evento" variant="outlined" size='small' />
                            <Button LinkComponent={Link} href='/events/create' variant="contained" color="primary">Ciar Novo Evento</Button>
                        </Box>
                    </CardContent>
                    <TableStickyHeader />
                </Card>
            </Grid>
        </Grid>
    )
}
