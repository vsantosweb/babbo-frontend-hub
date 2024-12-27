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
import Graph from '../../../components/graphs/Graph';
import { SessionHelper } from '@/helpers';
import moment from 'moment';
import { EventProvider, useEvent } from '@/hooks';
import { GetServerSidePropsContext } from "next/types";
import EventPanelContext from '../EventPanelContext';
import { formatPrice } from '@/tools';
// import SharesChart from './SharesChart';

const eventServiceCustomer = container.get<CustomerEventRepositoryInterface>('customer-event');

const stats = [
    { label: 'Total Interações', value: '86.000' },
    { label: 'Total impressões', value: '71.887' },
    { label: 'Total cliques', value: '1.800' },
    { label: 'Shares', value: '500' },
]


export default function Event() {

    const [summaryData, setSummaryData] = useState<Record<string, any>>();
    const { eventCustomer, summary } = useEvent();

    const event = eventCustomer;
    
    useEffect(() => {

        if (event) summary(event?.id as number).then(response => {
            setSummaryData(response.data)
            console.log(response, 'id: number')
        })

    }, [event])
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
            {summaryData ? <Flex gap={{ base: 0, md: 6 }} width={'100%'} flex={1}>

                <Stack flex={1} height='100%'>
                    {/* <EventDetails handleDelete={handleDeleteEvent} event={event} /> */}
                    <Box>
                        <SimpleGrid columns={{ base: 1, md: summaryData?.financial.sales.length }} gap={{ base: '5', md: '6' }}>
                            {summaryData?.financial.sales.map((sale: { status: string, total: number, label: string }, index: number) => {
                                return <Stat key={index} borderRadius={'xl'} p={3} borderWidth='1px' gap='2'>
                                    <StatLabel>{sale.label}</StatLabel>
                                    <StatNumber>{formatPrice(sale.total || 0)}</StatNumber>
                                </Stat>
                            })}
                        </SimpleGrid>
                    </Box>
                    <Stack spacing='4' borderWidth='1px' p='4' borderRadius='lg'>
                        <Heading size='md'>Histórico de vendas</Heading>
                        <Graph label='Vendas' data={summaryData?.financial.sales_history.dates} />
                    </Stack>
                    <Stack borderWidth='1px' spacing='4' p='4' borderRadius='lg'>
                        <Heading size='md'>Ingressos</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '5', md: '6' }}>
                            <Stat borderRadius={'xl'} gap='2'>
                                <StatLabel>Ingressos vendidos</StatLabel>
                                <StatNumber>{summaryData?.financial.sold_tickets}</StatNumber>
                            </Stat>
                            <Stat borderRadius={'xl'} gap='2'>
                                <StatLabel>Ticket Médio</StatLabel>
                                <StatNumber>{formatPrice(summaryData?.financial.average_ticket)}</StatNumber>
                            </Stat>
                        </SimpleGrid>
                    </Stack>

                    <Stack borderWidth='1px' p='4' spacing='4' borderRadius='lg'>
                        <Heading size='md'>Repasses</Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
                            <Stat borderRadius={'xl'} p={3} gap='2'>
                                <StatLabel>Total a receber</StatLabel>
                                <StatNumber>{summaryData?.financial.sold_tickets}</StatNumber>
                            </Stat>
                            <Stat borderRadius={'xl'} gap='2'>
                                <StatLabel>Repassado para a carteira</StatLabel>
                                <StatNumber>{formatPrice(0)}</StatNumber>
                            </Stat>
                            <Stat borderRadius={'xl'} gap='2'>
                                <StatLabel>Valor a receber</StatLabel>
                                <StatNumber>{formatPrice(summaryData?.financial.average_ticket)}</StatNumber>
                            </Stat>
                        </SimpleGrid>
                    </Stack>

                </Stack>
            </Flex> : <Spinner />}
        </Layout>

    );
}
