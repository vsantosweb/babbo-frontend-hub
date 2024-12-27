
import { theme } from "@/themes/default";
import { Avatar, Box, Button, Flex, HStack, IconButton, MenuItem, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvailableCities } from '../AvailableCities';
import { Logo } from "../Logo";
import { EventProvider, useApp, useAuth } from "@/hooks";
import { LuUser2 } from "react-icons/lu";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu";
import { IoBagHandle } from "react-icons/io5";
import { useRouter } from "next/router";

export function NavigationDesktop() {
    const { user, setRequestModalLogin } = useAuth()
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const { setRedirectPath } = useApp();

    return (

        <Flex
            gap={4}
            maxWidth={theme.defaultContainer.width}
            width={'100%'}
            margin={'auto'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <HStack w='100%' spacing={6}>
                <Box
                    as={Link}
                    href={'/'}
                    fontWeight={'bold'}
                    fontSize={'2em'}
                    fontFamily={'heading'}
                    width={'110px'}
                    color={'primary'}
                >
                    <Logo />
                </Box>
                <EventProvider>
                    <EventSearch />
                </EventProvider>
            </HStack>
            <Button variant='ghost' onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            <AvailableCities />
            {user ?
                <ProfileMenu extraItems={
                    <MenuItem as={Link} href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/minhas-compras`} icon={<IoBagHandle />}>Minhas compras</MenuItem>
                } />
                : <Button onClick={() => {
                    setRedirectPath(router.asPath)
                    setRequestModalLogin({ active: true, redirect: router.asPath })
                }} size='sm' variant='outline'>Entrar</Button>}
        </Flex>

    );
}
