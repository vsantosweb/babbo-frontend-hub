import { EventInterface } from "@/types";
import { Heading, Stack, Text } from "@chakra-ui/react";

export default function EventDetails({ event }: { event: EventInterface }) {
    return (
        <Stack spacing={4}>
            <Heading size={{ base: 'lg', md: 'xl' }}>{event?.name}</Heading>
            <Text size={'xs'}>{event?.category}</Text>
        </Stack>
    )
}
