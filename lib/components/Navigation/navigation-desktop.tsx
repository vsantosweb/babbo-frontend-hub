
import { theme } from "@/themes/default";
import { Box, Button, Flex, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import { EventSearch } from "../EventSearch";
import { AvaiableCitiesDesktop } from "../AvaiableCities";
import { Logo } from "../Logo";

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
            {/* <AvaiableCitiesDesktop /> */}
        </Flex>

    );
}
