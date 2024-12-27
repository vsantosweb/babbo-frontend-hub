import { CopyLinkButton } from "@/components";
import { EventInterface } from "@/types";
import { Box, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft, FaExpand } from "react-icons/fa";
import { Lightbox } from "react-modal-image";
declare module 'react-modal-image' {
    export interface ModalImageProps {
        onClose?: () => void;
    }
}

export default function EventPoster({ event }: { event: EventInterface }) {

    const { onOpen, isOpen, onClose } = useDisclosure();

    const router = useRouter();

    return (
        <Box
            borderRadius={{ base: '0', md: 'xl' }}
            position={'relative'}
        >
            {isOpen && <Lightbox
                medium={`${event?.event_image}-md.jpg`}
                large={`${event?.event_image}-lg.jpg`}
                small={`${event?.event_image}-sm.jpg`}
                alt={event?.name}
                onClose={onClose}
                hideZoom={true}
                hideDownload={true}
            />}

            {/* Imagem com resolução alta para telas grandes */}
            <Box
                as={'img'}
                borderRadius={{ base: '0', md: 'xl' }}
                alt={event?.name as string}
                width={{ base: '100%', lg: '305px' }}
                boxShadow={{
                    base: 'none',
                    md: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                }}
                src={`${event?.event_image}-lg.jpg`}
                // srcSet={`${event?.event_image}-lg.jpg 1600w,${event?.event_image}-md.jpg 800w,${event?.event_image}-xs.jpg 400w`}
                // sizes="(max-width: 767px) 95vw, (max-width: 991px) 90vw, 50vw"
                className="event-banner-img"
                style={{
                    maxWidth: '100%',
                    height: '480px',
                    objectFit: 'cover',
                    overflow: 'hidden',
                    display: 'block',
                }}
            />
            <IconButton
                top={0}
                onClick={router.back}
                variant={'oultine'}
                transform={'translateX(-60px)'}
                position={'absolute'}
                aria-label='back'
                icon={<FaArrowLeft />}
            />
            <Box
                position={'absolute'}
                right={0}
                top={0}
                m={3}
                textAlign={'center'}
            >

                <IconButton
                    size={'sm'}
                    onClick={onOpen}
                    boxShadow={'md'}
                    variant={'solid'}
                    background="white"
                    color='black'
                    aria-label='expand-image'
                    icon={<FaExpand />} />

            </Box>           
        </Box>
    )
}
