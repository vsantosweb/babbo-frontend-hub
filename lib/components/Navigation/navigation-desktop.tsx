
import { theme } from "@/themes/default";
import { Avatar, Box, Button, Flex, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvaiableCities } from "../AvaiableCities";
import { Logo } from "../Logo";
import { EventProvider, useAuth } from "@/hooks";
import { LuUser2 } from "react-icons/lu";
import Link from "next/link";

export function NavigationDesktop() {
    const { user, setRequestModalLogin } = useAuth()

    console.log(user, 'useruser')
    return (

        <Flex
            gap={4}
            maxWidth={theme.defaultContainer.width}
            width={'100%'}
            margin={'auto'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                as={Link}
                href={'/'}
                fontWeight={'bold'}
                fontSize={'2em'}
                fontFamily={'heading'}
                width={'110px'}
                color={theme.colors.primary}
            >
                <Logo />
            </Box>
            <EventProvider>
                <EventSearch />
            </EventProvider>
            <AvaiableCities />
            {user ? <Avatar as={Link} href='/minhas-compras' bg={'gray.500'} icon={<LuUser2 fontSize='1.5rem' />} /> : <Button onClick={() => setRequestModalLogin({ active: true, redirect: '/minhas-compras' })} size='sm' variant='outline'>Entrar</Button>}
        </Flex>

    );
}
