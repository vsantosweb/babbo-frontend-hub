import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Datebox({ date }: { date?: string }) {
    return (
        <Box maxWidth={'80px'} p='6' borderRight={'solid 1px #ddd'} py={2}>
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Text fontSize='xs'>Sab</Text>
                <Heading color='primary.500' fontWeight={'bold'} size='md'>24</Heading>
                <Text fontSize={'xs'}>Abr</Text>
                {/* <Text fontSize={'xs'}>18h</Text> */}
            </Flex>
        </Box>
    )
}
