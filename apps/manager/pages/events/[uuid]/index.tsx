import {
    Box,
    Container,
    Heading,
    Flex,
    Divider,
    Text,
    Select,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    HStack,
    Switch 
} from '@chakra-ui/react';
import EventDetails from './EventDetails';
import ImpressionsChart from './ImpressionsChart';
import ClicksChart from './ClicksChart';
import Layout from '@/layouts';
import { DatePickerDialog, EventImageUpload } from '@/components';
import { useForm } from 'react-hook-form';
// import SharesChart from './SharesChart';

export default function Event() {
    const eventForm = useForm();

    return (
        <Layout name="manager">
            <Flex m={'auto'} gap={4} width={'100%'}>
                <Stack spacing={4}>
                    <EventImageUpload hookForm={eventForm} />
                </Stack>
                <Stack flex={1} spacing={6}>
                    <Stack>
                        <Box mb={8}>
                            <EventDetails />
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
