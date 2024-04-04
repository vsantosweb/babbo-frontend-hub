import {
    Box,
    Flex,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Container,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import EventDetails from '../../../components/EventDetails';
import Layout from '@/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventInterface } from '@/types';
import { EventRepositoryInterface, MangerEventRepositoryInterface } from '@/interfaces';
import container from '@/container';
import ImpressionGraph from 'apps/manager/components/graphs/ImpressionGraph';
// import SharesChart from './SharesChart';

const eventServiceManager = container.get<MangerEventRepositoryInterface>('event-manager');

const stats = [
    { label: 'Total Interações', value: '86.000' },
    { label: 'Total impressões', value: '71.887' },
    { label: 'Total cliques', value: '1.800' },
    { label: 'Shares', value: '500' },
]

export default function Event() {

    const router = useRouter();
    const [event, setEvent] = useState<EventInterface>();
    const [impressions, setImpressions] = useState<Record<string, string | number | undefined>>();

    useEffect(() => {

        const id = router.query.uuid;

        if (id) {

            eventServiceManager.event(id as string).then((response: any) => {
                setEvent(response.data);

                eventServiceManager.impressionsByDate(response.data.id).then(response => {
                    setImpressions(response.data);
                })
            });
        }

    }, [router.query]);

    return (
        <Layout name="manager">
            <Flex gap={8} width={'100%'}>
                <Stack spacing={4}>
                    <Box boxShadow={{
                        base: 'none',
                        md: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    }} overflow="hidden" borderRadius="lg" width="300px">
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`${event?.event_image}-lg.jpg`} />
                    </Box>
                </Stack>
                <Stack flex={1} spacing={6}>
                    <Stack>
                        <Box mb={8}>
                            <EventDetails event={event} />
                        </Box>
                        <Box as="section" >
                            <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: '5', md: '6' }}>
                                {stats.map(({ label, value }) => (
                                    <Stat borderRadius={'xl'} p={3} border={'solid 1px #ddd'}>
                                        <StatLabel>{label}</StatLabel>
                                        <StatNumber>{value}</StatNumber>
                                        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                                    </Stat>
                                ))}
                            </SimpleGrid>
                        </Box>
                        {/* Sessão de gráficos */}
                        <Box>
                            <Flex flexWrap="wrap" justifyContent="space-between" mb={8}>
                                {/* Gráfico de Impressões */}
                                <Stack width={'100%'} mb={[4, 0]} spacing={5}>
                                    <Box w={['25%']}></Box>
                                    <ImpressionGraph data={impressions} />
                                </Stack>
                            </Flex>
                        </Box>
                    </Stack>
                </Stack>
            </Flex>
        </Layout>
    );
}
