import { EventInterface } from '@/types'
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function StoreHeader({ event }: { event: EventInterface }) {
    return (

        <Box borderBottom='solid 1px #ddd' gap='4' maxHeight='300px' display='flex' py='3'>
            <Box width='170px' overflow='hidden'>
                <Image borderRadius='2xl' overflow='hidden' width='100%' src='https://event-kraken.s3.amazonaws.com/event/posters/75702/large.jpg' />
            </Box>
            <Stack>
                <Heading fontSize={{ lg: '2xl' }} fontWeight='bold'>{event.name}</Heading>
                <Text fontSize='sm' color='gray.400'>{event.description}</Text>
            </Stack>
        </Box>
    )
}
