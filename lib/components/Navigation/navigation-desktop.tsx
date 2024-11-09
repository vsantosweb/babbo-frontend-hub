
import { theme } from "@/themes/default";
import { Avatar, Box, Button, Flex, HStack, IconButton, MenuItem, Stack, useColorModeValue } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvailableCities } from '../AvailableCities';
import { Logo } from "../Logo";
import { EventProvider, useAuth } from "@/hooks";
import { LuUser2 } from "react-icons/lu";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu";
import { IoBagHandle } from "react-icons/io5";

export function NavigationDesktop() {
    const { user, setRequestModalLogin } = useAuth()

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
            <AvailableCities />
            {user ?
                <ProfileMenu extraItems={
                    <MenuItem as={Link} href='minhas-compras' icon={<IoBagHandle />}>Minhas compras</MenuItem>
                } />
                : <Button onClick={() => setRequestModalLogin({ active: true, redirect: '/minhas-compras' })} size='sm' variant='outline'>Entrar</Button>}
        </Flex>

    );
}
