import { eventDateFormatter } from '@/helpers'
import { EventInterface } from '@/types'
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function StoreHeader({ event }: { event: EventInterface }) {
    return (

        <Box borderBottomWidth='1px' gap='4' alignItems='center' maxHeight='300px' display='flex' pb='3'>
            <Box boxShadow={'xl'} borderRadius={'lg'} overflow={'hidden'}>
                <Image  objectFit={'cover'} src={`${event.event_image}-md.jpg`} alt={event.name} boxSize="80px" />
            </Box>
            <Stack>
                <Heading fontSize={{ lg: '2xl' }} fontWeight='bold'>{event.name}</Heading>
                <Text fontSize='sm' color='gray.400'>{eventDateFormatter(event).fully}</Text>
            </Stack>
        </Box>
    )
}
