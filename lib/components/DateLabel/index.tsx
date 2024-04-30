import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export function DateLabel() {
    return (
        <Box as={'button'} m={2} border={'solid 1px #ddd'} py={2} borderRadius={'2xl'} width={'100%'} >
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Text>Sab</Text>
                <Heading>24</Heading>
                <Text>Abr</Text>
                <Text fontSize={'xs'}>18h</Text>
            </Flex>
        </Box>
    )
}
