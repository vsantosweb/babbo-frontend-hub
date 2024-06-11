import { Avatar, Box, Button, Card, CardActionArea, CardContent, Divider, Grid, Typography } from "@mui/material";
import EventForm from "../form";
import { AdminEventRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';
import { GetServerSidePropsContext } from "next/types";
import container from "@/container";
import EventInfoDetails from "../components/EventInfoDetails";
import CardNavigation from "../components/CardNavigation";

const adminEventService = container.get<AdminEventRepositoryInterface>('admin-event');

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const id: string = query?.uuid as string

    const event = await adminEventService.show(id);

    return {
        props: {
            event: event.data
        }
    };
}

export default function EventPanel({ event }: { event: EventInterface }) {
    console.log(event, 'eventevent')
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
                <Grid sx={{ mb: 4 }} spacing={4} container>
                    {[0, 1, 2, 3].map(x => <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Box>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Impressoes</Typography>
                                        <Typography variant="h5" component="div">
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} variant='h4' color="text.primary"> 5678 </Typography>
                                        <Typography variant="body2">No sistema</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>)}

                </Grid>
                <CardNavigation />

            </Grid>
        </Grid>
    )
}
