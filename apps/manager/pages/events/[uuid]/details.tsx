import {
    Box,
    Flex,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import EventDetails from './components/EventDetails';
import ImpressionsChart from './components/ImpressionsChart';
import Layout from '@/layouts';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventInterface } from '@/types';
import { EventRepositoryInterface } from '@/interfaces';
import container from '@/container';
// import SharesChart from './SharesChart';

const eventServiceManager = container.get<EventRepositoryInterface>('event-manager');

export default function Event() {

    const router = useRouter();
    const [event, setEvent] = useState<EventInterface>();

    useEffect(() => {

        const id = router.query.uuid;

        if (id) {
            
            eventServiceManager.event(id as string).then((response: any) => {
                setEvent(response.data);
            });
        }

    }, [router]);

    return (
        <Layout name="manager">
            <Flex m={'auto'} gap={4} width={'100%'}>
                <Stack spacing={4}>
                    <Box overflow="hidden" borderRadius="md" width="300px" height="416px">
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`${event?.event_image}-lg.jpg`} />
                    </Box>
                </Stack>
                <Stack flex={1} spacing={6}>
                    <Stack>
                        <Box mb={8}>
                            <EventDetails event={event} />
                        </Box>

                        {/* Sessão de gráficos */}
                        <Box>
                            <Tabs variant="soft-rounded" colorScheme="primary">
                                <TabList>
                                    <Tab>Impressões</Tab>
                                    <Tab>Cliques</Tab>
                                    <Tab>Shakes</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Flex flexWrap="wrap" justifyContent="space-between" mb={8}>
                                            {/* Gráfico de Impressões */}
                                            <Stack width={'100%'} mb={[4, 0]} spacing={5}>
                                                <Box w={['25%']}></Box>
                                                <ImpressionsChart />
                                            </Stack>
                                        </Flex>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>two!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Stack>
                </Stack>
            </Flex>
        </Layout>
    );
}
