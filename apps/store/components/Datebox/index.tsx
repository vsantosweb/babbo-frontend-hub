import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import moment from 'moment';
import React from 'react'

export default function Datebox({ date }: { date?: string }) {

    const sessionDate = moment(date);

    const week = sessionDate.format('ddd').toUpperCase(); // 'SAB'
    const day = sessionDate.format('DD');                   // '24'
    const month = sessionDate.format('MMM').charAt(0).toUpperCase() + sessionDate.format('MMM').slice(1);

    return (
        <Box maxWidth={'80px'} p='6' borderRight={'solid 1px #ddd'} py={2}>
            <Flex flexDirection={'column'} alignItems={'center'}>
                <Text fontSize='xs'>{week}</Text>
                <Heading color='primary.500' fontWeight={'bold'} size='md'>{day}</Heading>
                <Text fontSize={'xs'}>{month}</Text>
                {/* <Text fontSize={'xs'}>18h</Text> */}
            </Flex>
        </Box>
    )
}
