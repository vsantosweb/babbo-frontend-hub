// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Alert, Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { RiDeleteBin5Line, RiEyeLine } from "react-icons/ri";
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { LoadingButton } from '@mui/lab';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EventInterface } from '@/types';
import { SessionHelper } from '@/helpers';
import dayjs from 'dayjs'

interface Column {
  id: any
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'user', label: 'User', },
  { id: 'email', label: 'email', },
  { id: 'role', label: 'role', },
  { id: 'plan', label: 'plan', },
  { id: 'status', label: 'status', },
  { id: 'action', label: 'action', },
]

interface Data {
  name: string
  code: string
  size: number
  density: number
  population: number
}
type EventTableProps = {
  columns: Column[],
  rows: Record<string, any> | undefined,
  fetchData: (params: Record<string, any>) => void
  handleDeleteEvent: (id: number) => Promise<any>
  filters: any
}


const EventTable = ({ rows, columns, fetchData, handleDeleteEvent, filters }: EventTableProps) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(20)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface>();

  useEffect(() => {

    const params = { ...filters, skip: page * rowsPerPage, limit: rowsPerPage }
    fetchData(params);

  }, [page, rowsPerPage, loading, filters]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const deleteEvent = () => {
    setLoading(true)
    selectedEvent?.id && handleDeleteEvent(selectedEvent?.id).then(res => {
      setLoading(false);
      setOpen(false);
      SessionHelper.withMessage('eventDeleted', {
        status: 'success',
        message: 'Evento excluído com sucesso.'
      })
    })

  }
  if (!rows) return <></>

  const sessionHelperMessage = {
    eventDeleted: SessionHelper.has('eventDeleted') && JSON.parse(SessionHelper.has('eventDeleted')),
    eventUpdated: SessionHelper.has('eventUpdated') && JSON.parse(SessionHelper.has('eventUpdated')),
    eventCreated: SessionHelper.has('eventCreated') && JSON.parse(SessionHelper.has('eventCreated')),
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      {!!sessionHelperMessage.eventDeleted && <Alert severity={sessionHelperMessage.eventDeleted.status}>{sessionHelperMessage.eventDeleted.message}</Alert>}
      {!!sessionHelperMessage.eventUpdated && <Alert severity={'info'}><span dangerouslySetInnerHTML={{ __html: sessionHelperMessage.eventUpdated }} /></Alert>}
      {!!sessionHelperMessage.eventCreated && <Alert severity={'success'}><span dangerouslySetInnerHTML={{ __html: sessionHelperMessage.eventCreated }} /></Alert>}

      <TableContainer >
        <Table size={'small'} stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.data?.map((row: any) => (
              <TableRow key={row.uuid}>
                <TableCell>
                  <Link href={`/events/${row.uuid}/edit`} key={row.id}>
                    <Box gap={3} style={{ display: 'flex', alignItems: 'center' }}>
                      <Box flexDirection={'column'} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: 'red' }} variant='subtitle1'>{dayjs(row.start_date).format('MMM').toUpperCase()}</Typography>
                        <Typography >{dayjs(row.start_date).format('DD').toUpperCase()}</Typography>
                      </Box>
                      <Avatar sx={{ width: 50, height: 50 }} src={`${row.event_image}-xs.jpg`} />
                      <div style={{ marginLeft: '10px' }}>
                        <Typography fontWeight={'500'}>{row.name}</Typography>
                        <Typography variant='body2' color={'text.secondary'}>{row.place_name}</Typography>
                      </div>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.updated_at}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{dayjs() > dayjs(row.end_date) ? 'Expirado' : 'Ativo'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => [handleClickOpen(), setSelectedEvent(row)]} aria-label="delete"><RiDeleteBin5Line /></IconButton>
                  <IconButton LinkComponent={Link} href={`/events/${row.uuid}/panel`} aria-label="show"><RiEyeLine /></IconButton>
                  <IconButton LinkComponent={Link} href={`/events/${row.uuid}/edit`} aria-label="edit"><MdEdit /></IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deseja excluir este evento?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Essa ação será irreversível, tem certeza?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancelar</Button>
          <LoadingButton
            onClick={deleteEvent}
            loading={loading}
          > Excluir
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default EventTable
