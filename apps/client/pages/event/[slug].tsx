import Layout from "@/layouts";
import { theme } from "@/themes/default";
import { Box, Flex, Heading, Stack, Text, Link, Button } from "@chakra-ui/react";
import { IoCalendar } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { Sharebutton } from "@/components";
import * as Styled from './styles';
import { useEvent } from "@/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EventInterface } from "@/types";

export default function Event() {

    const { fetchEvent } = useEvent();
    const router = useRouter();
    const [event, setEvent] = useState<EventInterface | null>(null)

    useEffect(() => {

        const id = router.query.id;
        router.query.id && fetchEvent(id as string).then(response => setEvent(response.data))
    }, [router])

    return (
        <Layout title={'home'} name={'client'}>
            <Stack px={4} pb={12} spacing={6}>
                <Box background={'#ddd'} marginX={'-2em'}>
                    <div className="event-banner" >
                        {/* Imagem com resolução alta para telas grandes */}
                        <img
                            src={`${event?.event_image}.jpg`}
                            srcSet={
                                `${event?.event_image}-lg.jpg 1600w,
                                ${event?.event_image}-md.jpg 800w,
                                ${event?.event_image}-xs.jpg 400w`
                            }
                            // srcSet="https://images.sympla.com.br/65f45cd3d33f3-lg.jpg 1600w,
                            //         https://images.sympla.com.br/65f45cd3d33f3-md.jpg 800w,
                            //         https://images.sympla.com.br/65f45cd3d33f3-xs.jpg 400w"
                            sizes="(max-width: 767px) 95vw, (max-width: 991px) 90vw, 50vw"
                            alt="Banner do evento"
                            loading="lazy"
                            className="event-banner-img"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* <Styled.ImageHeader src={`${event?.event_image}-lg.jpg`}
                                        srcSet={`${event?.event_image}-lg.jpg
                        500w, ${event?.event_image}-lg.jpg 1200w`}
                                        sizes="(max-width: 1024px) 80vw, 100vw"
                                        loading="lazy"
                                        style={{ backgroundImage: `url(${event?.event_image}-md.jpg)`, maxHeight: '520px' }}
                                    /> */}
                    {/* <img
                        width={'100%'}
                        // style={{ height: '240px' }}
                        src={'https://terrasp.com/wp-content/uploads/2024/01/15MAR-NANDO-REIS-SITE-1.jpg'}
                    /> */}
                    <Box position={'absolute'} right={0} textAlign={'center'} m={'auto'} mt={-15} left={0}>
                        <Sharebutton />
                    </Box>
                </Box>
                <Stack spacing={4} >
                    <Heading>4th SWAN Annual Meeting - "Rising Above the Noise"</Heading>
                    <Flex gap={2} direction={'column'}>
                        <Heading size={'md'}>Abount Event</Heading>
                        <Text>
                            We are a nation wide network of women who want to increase their impact in society
                            by connecting women leaders across age, professions, ethnicity and economic status.
                        </Text>
                        <Link>Read more</Link>
                    </Flex>
                </Stack>
                <Stack spacing={6}>
                    <Flex gap={4} alignItems={'center'}>
                        <Box
                            padding={4}
                            fontSize={'1.4em'}
                            borderRadius={theme.defaultRadius}
                            color={theme.colors.primary}
                            background={`${theme.colors.primary}26`}
                        >
                            <IoCalendar />
                        </Box>
                        <Flex gap={1} direction={'column'}>
                            <Heading size={'md'}>12 May, 2020 - 7PM</Heading>
                            <Text>Monday, 7:00PM - 9:00PM</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={4} alignItems={'center'}>
                        <Box
                            padding={4}
                            fontSize={'1.4em'}
                            borderRadius={theme.defaultRadius}
                            background={`${theme.colors.primary}26`}
                            color={theme.colors.primary}
                        >
                            <HiLocationMarker />
                        </Box>
                        <Flex gap={1} direction={'column'}>
                            <Heading size={'md'}>Business Design Centre</Heading>
                            <Text>52 Upper street, London N1 0QH</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={4} alignItems={'center'}>
                        <Box
                            padding={4}
                            fontSize={'1.4em'}
                            borderRadius={theme.defaultRadius}
                            background={`${theme.colors.primary}26`}
                            color={theme.colors.primary}
                        >
                            <FaTicketAlt />
                        </Box>
                        <Flex gap={1} direction={'column'}>
                            <Heading size={'md'}>Ingressos</Heading>
                            <Text>Ticket 360</Text>
                        </Flex>
                    </Flex>
                    {/* <Button leftIcon={<FaTicketAlt />} size={'lg'} variant={'primary'}>Comprar ingressos</Button> */}

                </Stack>
            </Stack>
        </Layout>
    )
}
