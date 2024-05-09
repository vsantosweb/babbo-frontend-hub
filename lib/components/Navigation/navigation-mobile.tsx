import { theme } from "@/themes/default";
import { Box, Button, Flex, IconButton, Link, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvaiableCities } from "../AvaiableCities";
import { Logo } from "../Logo";
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { IoCloseOutline, IoMenu } from "react-icons/io5";

export function NavigationMobile() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (

        <Flex
            gap={4}
            maxWidth={theme.defaultContainer.width}
            width={'100%'}
            margin={'auto'}
            alignItems={'center'}
        >
            <Box
                as={Link}
                href={'/'}
            >
                <Logo style={{ width: '85px' }} />
            </Box>
            <Flex gap={3} width={'100%'} justifyContent={'flex-end'}>
                <EventSearch />
                {/* <IconButton aria-label='search-icon' icon={<SearchIcon />}/> */}
            </Flex>
            <Box flex={1}>
                {!isOpen ? <Flex as={'button'}><IoMenu onClick={onOpen} fontSize={'1.5em'} /></Flex> :
                    <Flex as={'button'}><IoCloseOutline onClick={onClose} fontSize={'1.5em'} /></Flex>}
            </Box>
            {
                isOpen && <Box
                    zIndex={-1}
                    position={'fixed'}
                    background={'white'}
                    top={'60px'}
                    right={0}
                    width={'100%'}
                    minHeight={'100%'}
                    height={'auto'}
                    px={4}
                >
                    <Flex flexDirection={'column'}>
                        <Box p={3} borderBottom={'solid 1px #f1f1f1'} width={'100%'}><AvaiableCities callback={() => onClose()} /></Box>
                    </Flex>
                </Box>
            }
        </Flex>
    );
}
