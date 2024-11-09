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
    Spinner,
    Heading,
} from '@chakra-ui/react';
import EventDetails from '../../../components/EventDetails';
import Layout from '@/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EventInterface } from '@/types';
import { EventRepositoryInterface, CustomerEventRepositoryInterface } from '@/interfaces';
import container from '@/container';
import InteractionGraph from 'apps/manager/components/graphs/ImpressionGraph';
import { SessionHelper } from '@/helpers';
import moment from 'moment';
import { EventProvider, useEvent } from '@/hooks';
import { GetServerSidePropsContext } from "next/types";
import EventPanelContext from '../EventPanelContext';
// import SharesChart from './SharesChart';

const eventServiceCustomer = container.get<CustomerEventRepositoryInterface>('customer-event');

const stats = [
    { label: 'Total Interações', value: '86.000' },
    { label: 'Total impressões', value: '71.887' },
    { label: 'Total cliques', value: '1.800' },
    { label: 'Shares', value: '500' },
]


export default function Event() {

    const [interactions, setInteractions] = useState<Record<string, any>>();
    const { event } = useEvent();
    
    console.log(event, 'eventevent')
    const handleDeleteEvent = async (id: number) => {
        await eventServiceCustomer.deleteEvent(id).then(response => {
            SessionHelper.redirectWith('/', 'eventDeleted', `O evento ${event?.name} foi excluído.`)
        })
    }

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };
    return (
        <Layout name="manager">
            {event ? <Flex gap={{ base: 0, md: 6 }} width={'100%'} flex={1}>
                <Stack spacing={4} >
                    <Box display={{ base: 'none', md: 'block' }} boxShadow={{
                        base: 'none',
                        md: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    }} overflow="hidden" borderRadius="lg" width="300px">
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`${event?.event_image}-lg.jpg`} />
                    </Box>
                </Stack>
                <Stack flex={1} height={'100%'}>
                    <Box mb={8}>
                        <EventDetails handleDelete={handleDeleteEvent} event={event} />
                    </Box>
                    <Box>
                        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: '5', md: '6' }}>
                            <Stat borderRadius={'xl'} p={3} border={'solid 1px #ddd'}>
                                <StatLabel>Impressoes</StatLabel>
                                <StatNumber>{interactions?.impressions?.total}</StatNumber>
                                <StatHelpText>{interactions?.impressions?.reference}</StatHelpText>
                            </Stat>
                            <Stat borderRadius={'xl'} p={3} border={'solid 1px #ddd'}>
                                <StatLabel>Cliques</StatLabel>
                                <StatNumber>{interactions?.clicks?.total}</StatNumber>
                                <StatHelpText>{interactions?.clicks?.reference}</StatHelpText>
                            </Stat>
                            <Stat borderRadius={'xl'} p={3} border={'solid 1px #ddd'}>
                                <StatLabel>Compartilhamentos</StatLabel>
                                <StatNumber>{interactions?.shares?.total}</StatNumber>
                                <StatHelpText>{interactions?.shares?.reference}</StatHelpText>
                            </Stat>
                        </SimpleGrid>
                    </Box>
                    <Box>
                        <Flex h={'100%'} justifyContent="space-between" mb={8}>
                            <Stack flex={1} width={'100%'} mb={[4, 0]} spacing={5}>
                                <Heading size={'md'}>Interações</Heading>
                                <Tabs variant={'enclosed'} colorScheme='black' w='100%' index={activeTab} onChange={handleTabChange}>
                                    <TabList>
                                        <Tab>Impressões</Tab>
                                        <Tab>Cliques</Tab>
                                        <Tab>Compartilhamentos</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            {activeTab === 0 && <InteractionGraph interaction='Impressões' data={interactions?.impressions.dates} />}
                                        </TabPanel>
                                        <TabPanel>
                                            {activeTab === 1 && <InteractionGraph interaction='Cliques' data={interactions?.clicks.dates} />}
                                        </TabPanel>
                                        <TabPanel>
                                            {activeTab === 2 && <InteractionGraph interaction='Compartilhamentos' data={interactions?.shares.dates} />}
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Stack>
                        </Flex>
                    </Box>
                </Stack>
            </Flex> : <Spinner />}
        </Layout>

    );
}
