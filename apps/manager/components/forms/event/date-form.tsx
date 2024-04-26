import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

export default function DateForm() {
    return (
        <Stack flexDirection={{ base: 'row', md: 'column'}}>
            <FormControl>
                <FormLabel>Data de inicio</FormLabel>
                <Input type={'datetime-local'} />
            </FormControl>
            <FormControl>
                <FormLabel>Data de término</FormLabel>
                <Input type={'datetime-local'} />
            </FormControl>
        </Stack>
    )
}
