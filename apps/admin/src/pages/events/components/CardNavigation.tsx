// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DateLabelButton } from '@/components';
import { Box, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionLot from './AccordionLot'
import SessionModalForm from './SessionModalForm'

import { AdminEventSessionRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';
import container from '@/container';
import ActionMenu from './ActionMenu'
import TabEventSessions from './TabEventSessions'

const adminEvenSessiontService = container.get<AdminEventSessionRepositoryInterface>('admin-event-session');


const CardNavigation = ({ event }: { event: EventInterface }) => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={'ingressos'}>
        <TabList variant='scrollable' onChange={handleChange} aria-label='card navigation example'>
          <Tab value='ingressos' label='Ingressos' />
        </TabList>
        <CardContent>
          <TabPanel value='ingressos' sx={{ p: 0 }}>
            <Stack spacing={4}>
              <Typography variant='h6' sx={{ marginBottom: 1 }}>Gerenciar Ingressos</Typography>
              <Typography variant='body1' sx={{ marginBottom: 4 }}>
                Bem-vindo ao gerenciador de ingressos, aqui você poderá configurar a
                data de venda, criar ingressos por lote ou individuais.
              </Typography>
              <TabEventSessions eventId={event.id} />
            </Stack>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigation
