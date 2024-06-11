import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { EventInterface } from '@/types';

const EventInfoDetails = ({ event }: { event: EventInterface }) => {
    return (
        <List dense disablePadding>
            {/* Informações do Evento */}
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Nome do evento:</strong> {event.name}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Categoria:</strong> {event.category}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Descrição:</strong> <span dangerouslySetInnerHTML={{ __html: event.description as string }} /></>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Data de início:</strong> {event.start_date}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Data de término:</strong> {event.end_date}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Status:</strong> {event.status}</>}
                />
            </ListItem>
            <Divider />

            {/* Informações do Local */}
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Local:</strong> {event.place.name}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Endereço:</strong> {event.place.formatted_address}</>}
                />
            </ListItem>
            <Divider />

            {/* Informações do Cliente */}
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Organizador:</strong> {event.customer.organizer_name}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Email do organizador:</strong> {event.customer.organizer_email}</>}
                />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary={<><strong>Telefone do organizador:</strong> {event.customer.phone}</>}
                />
            </ListItem>
        </List>
    );
};

export default EventInfoDetails;
