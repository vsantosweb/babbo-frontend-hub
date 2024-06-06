// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { RiDeleteBin5Line, RiEyeLine } from "react-icons/ri";
import Link from 'next/link'

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

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size

  return { name, code, population, size, density }
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ]


const rows = [
  { id: '1', user: 'user1', avatarUrl: 'https://via.placeholder.com/150', email: 'user1@example.com', role: 'Admin', plan: 'Pro', status: 'Active' },
  { id: '2', user: 'user2', avatarUrl: 'https://via.placeholder.com/150', email: 'user2@example.com', role: 'User', plan: 'Basic', status: 'Inactive' },
  { id: '3', user: 'user3', avatarUrl: 'https://via.placeholder.com/150', email: 'user3@example.com', role: 'Editor', plan: 'Enterprise', status: 'Pending' },
  { id: '4', user: 'user4', avatarUrl: 'https://via.placeholder.com/150', email: 'user4@example.com', role: 'User', plan: 'Pro', status: 'Active' },
  { id: '5', user: 'user5', avatarUrl: 'https://via.placeholder.com/150', email: 'user5@example.com', role: 'Admin', plan: 'Basic', status: 'Inactive' },
  { id: '6', user: 'user6', avatarUrl: 'https://via.placeholder.com/150', email: 'user6@example.com', role: 'Editor', plan: 'Enterprise', status: 'Pending' },
  { id: '7', user: 'user7', avatarUrl: 'https://via.placeholder.com/150', email: 'user7@example.com', role: 'Admin', plan: 'Pro', status: 'Active' },
  { id: '8', user: 'user8', avatarUrl: 'https://via.placeholder.com/150', email: 'user8@example.com', role: 'User', plan: 'Basic', status: 'Inactive' },
  { id: '9', user: 'user9', avatarUrl: 'https://via.placeholder.com/150', email: 'user9@example.com', role: 'Editor', plan: 'Enterprise', status: 'Pending' },
  { id: '10', user: 'user10', avatarUrl: 'https://via.placeholder.com/150', email: 'user10@example.com', role: 'Admin', plan: 'Pro', status: 'Active' },
  { id: '11', user: 'user11', avatarUrl: 'https://via.placeholder.com/150', email: 'user11@example.com', role: 'User', plan: 'Basic', status: 'Inactive' },
  { id: '12', user: 'user12', avatarUrl: 'https://via.placeholder.com/150', email: 'user12@example.com', role: 'Editor', plan: 'Enterprise', status: 'Pending' },
  { id: '13', user: 'user13', avatarUrl: 'https://via.placeholder.com/150', email: 'user13@example.com', role: 'Admin', plan: 'Pro', status: 'Active' },
  { id: '14', user: 'user14', avatarUrl: 'https://via.placeholder.com/150', email: 'user14@example.com', role: 'User', plan: 'Basic', status: 'Inactive' },
  { id: '15', user: 'user15', avatarUrl: 'https://via.placeholder.com/150', email: 'user15@example.com', role: 'Editor', plan: 'Enterprise', status: 'Pending' }
];

const TableStickyHeader = ({ data, columns }: { columns: Column[], data: Record<string, any> }) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  console.log(data, 'data')
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table size={'small'} stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow>
                <TableCell>
                  <Link href={`/events/${row.uuid}/edit`} key={row.id}>
                    <Box gap={2} style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 56, height: 56 }} src={`${row.event_image}-xs.jpg`} />
                      <div style={{ marginLeft: '10px' }}>
                        <Typography fontWeight={'500'}>{row.name}</Typography>
                        <Typography variant='body2' color={'text.secondary'}>{row.place_name}</Typography>
                      </div>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete"><RiDeleteBin5Line /></IconButton>
                  <IconButton aria-label="delete"><RiEyeLine /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
