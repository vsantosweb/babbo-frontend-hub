import { EventInterface } from "@/types";
import { Heading, Stack, Text } from "@chakra-ui/react";

export default function EventDetails({ event }: { event: EventInterface }) {
    return (
        <Stack spacing={1}>
            <Text fontSize={'sm'}>{event?.category}</Text>
            <Heading size={{ base: 'lg', md: 'xl' }}>{event?.name}</Heading>
        </Stack>
    )
}
