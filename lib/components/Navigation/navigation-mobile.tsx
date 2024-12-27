import { theme } from "@/themes/default";
import { Box, Button, Flex, IconButton, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvailableCities } from "../AvailableCities";
import { Logo } from "../Logo";
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { IoCloseOutline, IoLogOutOutline, IoMenu, IoPersonOutline } from "react-icons/io5";
import { useApp, useAuth } from "@/hooks";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import { useRouter } from "next/router";

export function NavigationMobile() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout, setRequestModalLogin } = useAuth()
    const { setRedirectPath } = useApp();
    const router = useRouter();
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
                >
                    <Flex flexDirection={'column'}>
                        <Box p={3} borderBottom={'solid 1px #f1f1f1'} width={'100%'}><AvailableCities callback={() => onClose()} /></Box>
                    </Flex>
                    {
                        user ? <Flex flexDirection={'column'}>
                            <Link href='/minha-conta'>
                                <Flex p={3} gap='2' alignItems='center' borderBottom={'solid 1px #f1f1f1'} width={'100%'}>
                                    <IoPersonOutline /> <span> Minha conta</span>
                                </Flex>
                            </Link>
                            <Link href='/minhas-compras'>
                                <Flex p={3} gap='2' alignItems='center' borderBottom={'solid 1px #f1f1f1'} width={'100%'}>
                                    <IoBagHandle /><span> Minhas compras</span>
                                </Flex>
                            </Link>
                            <Link href='/minha-conta'>
                                <Flex p={3} onClick={logout} gap='2' alignItems='center' borderBottom={'solid 1px #f1f1f1'} width={'100%'}>
                                    <IoLogOutOutline /><span> Sair</span>
                                </Flex>
                            </Link>

                        </Flex> : <Flex p={3} gap='2' onClick={() => {
                            console.log(router.asPath)
                            // setRedirectPath(router.asPath)
                            // setRequestModalLogin({redirect: router.asPath , active: true})
                        }} alignItems='center' borderBottom={'solid 1px #f1f1f1'} width={'100%'}>
                            <IoPersonOutline /> <span>Entrar</span>
                        </Flex>
                    }
                </Box>
            }
        </Flex>
    );
}
