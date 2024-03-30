import { DatePickerDialog } from "@/components";
import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";

export default function DateForm() {
    return (
        <HStack>
            <FormControl>
                <FormLabel>Data de inicio</FormLabel>
                <Input type={'datetime-local'} />
            </FormControl>
            <FormControl>
                <FormLabel>Data de término</FormLabel>
                <Input type={'datetime-local'} />
            </FormControl>
        </HStack>
    )
}
