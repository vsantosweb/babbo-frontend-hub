import { Sharebutton } from "@/components";
import { useEventShare } from "@/hooks";
import { EventInterface } from "@/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";

export default function EventPoster({ event }: { event: EventInterface }) {

    const router = useRouter();
    const { handleShareClick } = useEventShare();
    return (
        <Box
            borderRadius={{ base: '0', md: 'xl' }}
            position={'relative'}
        >
            {/* Imagem com resolução alta para telas grandes */}
            <Box
                as={'img'}
                borderRadius={{ base: '0', md: 'xl' }}
                alt={event?.name as string}
                boxShadow={{
                    base: 'none',
                    md: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                }}
                src={`${event?.event_image}-lg.jpg`}
                // srcSet={`${event?.event_image}-lg.jpg 1600w,${event?.event_image}-md.jpg 800w,${event?.event_image}-xs.jpg 400w`}
                // sizes="(max-width: 767px) 95vw, (max-width: 991px) 90vw, 50vw"
                className="event-banner-img"
                style={{
                    width: '100%',
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
                textAlign={'center'}
                mt={-15}
                left={0}
            >
                <Button rightIcon={<FaShareAlt />}
                    onClick={() => handleShareClick({
                        id: event?.uuid,
                        title: event?.name,
                        text: event?.description,
                        url: router.asPath,
                    })}
                >Compartilhar</Button>

            </Box>
        </Box>
    )
}
