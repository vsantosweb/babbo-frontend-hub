import { EventCard, ResultMessage } from "@/components";
import { theme } from "@/themes/default";
import { EventInterface } from "@/types";
import { Avatar, Box, Button, Flex, Heading, IconButton, Stack, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem, Link } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";

export function OrganizerPage({ events, organizerProfile }: { events?: EventInterface[], organizerProfile?: Record<string, any> }) {

    if (!organizerProfile) return <></>


    const eventCount = organizerProfile.organizer_events_count;

    const eventCountText = eventCount === 0 ? 'Nenhum evento publicado' : eventCount > 1 ? `${eventCount} eventos publicados` : `${eventCount} evento publicado`
    return (
        <Stack mt={6} width={'100%'} maxWidth={theme.defaultContainer.width} mx={'auto'}>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                textAlign={{ base: 'center', md: 'inherit' }}
                gap={4}
                direction={'column'}
            >
                <Flex gap={4} width={'100%'} maxWidth={'700px'} direction={{ base: 'column', md: 'row' }} alignItems={'center'}>
                    <Avatar boxShadow={'xl'} src={organizerProfile.organizer_avatar} size={{ base: 'xl', md: '2xl' }} />
                    <Stack flex={1} spacing={2}>
                        <Flex justifyContent={{ base: 'center', md: 'flex-start' }} alignItems={'center'} gap={3}>
                            <Heading size={'lg'}>{organizerProfile.organizer_name}</Heading>
                            <IconButton
                                as={Link}
                                href={`mailto:${organizerProfile.organizer_email}`}
                                aria-label='organizer-contact'
                                icon={<FaEnvelope />}
                            />
                        </Flex>
                        <Text>{eventCountText}</Text>
                        <Text as={Link} target={'_parent'} href={organizerProfile.organizer_instagram}>{organizerProfile.organizer_instagram}</Text>
                        {/* <Box><Button>Seguir +</Button></Box> */}
                    </Stack>
                </Flex>
                <Tabs width={'100%'} colorScheme={'primary.500'}>
                    <TabList>
                        <Tab _active={{ fontWeight: 'bold' }}>Eventos ativo</Tab>
                        {/* <Tab>Encerrados</Tab> */}
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0} >
                            {
                                events ? (
                                    events.length > 0 ? <Grid templateColumns={{
                                        lg: 'repeat(4, minmax(0, 1fr))',
                                        md: 'repeat(2, minmax(0, 1fr))',
                                        sm: 'repeat(1, minmax(0, 1fr))',
                                    }} gap={4}>
                                        {events?.map((event, index) => (
                                            <GridItem key={index} overflow={'hidden'}>
                                                <EventCard {...event} />
                                            </GridItem>
                                        ))}
                                    </Grid> : <ResultMessage title="Nenhum evento encontrado" description="Este organizador não possui eventos para exibir" />
                                ) : ''
                            }

                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Stack>
    )
}
