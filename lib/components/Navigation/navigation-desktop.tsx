
import { theme } from "@/themes/default";
import { Box, Button, Flex, IconButton, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvaiableCities } from "../AvaiableCities";
import { Logo } from "../Logo";
import { SearchIcon } from "@chakra-ui/icons";

export function NavigationDesktop() {
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
                fontWeight={'bold'}
                fontSize={'2em'}
                fontFamily={'heading'}
                width={'110px'}
                color={theme.colors.primary}
            >
                <Logo />
            </Box>
            <EventSearch />
            <AvaiableCities />
        </Flex>

    );
}
