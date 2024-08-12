import { Avatar, Box, Button, Card, CardActionArea, CardContent, Divider, Grid, Typography } from "@mui/material";
import EventForm from "../form";
import { AdminEventRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';
import { GetServerSidePropsContext } from "next/types";
import container from "@/container";
import EventInfoDetails from "../components/EventInfoDetails";
import CardNavigation from "../components/CardNavigation";
import { AdminEventSessionRepositoryInterface } from '@/interfaces';
import { useEffect, useState } from "react";

const adminEventService = container.get<AdminEventRepositoryInterface>('admin-event');
const adminEvenSessiontService = container.get<AdminEventSessionRepositoryInterface>('admin-event-session');

type EventSessionType = {
    id: number,
    name: string,
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const id: string = query?.uuid as string

    const event = await adminEventService.show(id);

    return {
        props: {
            event: event.data,
        }
    };
}

export default function EventPanel({ event }: { event: EventInterface }) {

    const [sessions, setSessions] = useState<EventSessionType[]>([])

    useEffect(() => {
        adminEvenSessiontService.get(event.id).then(response => setSessions(response.data))
    }, [])

    const handleCreateSession = async (payload: { name: string }) => {

        await adminEvenSessiontService.create(payload, event.id);

    }

    const eventActions = { handleCreateSession, sessions }

    return (
        <Grid spacing={4} container>
            <Grid item md={3}>
                <Card>
                    <CardContent>
                        <Box gap={4} display={'flex'} flexDirection={'column'}>
                            <img style={{ borderRadius: '18px', width: '100%' }} src={`${event.event_image}.jpg`} />
                            <EventInfoDetails event={event} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={9}>
                <CardNavigation event={event} />
            </Grid>
        </Grid>
    )
}
