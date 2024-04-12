import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Checkbox, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FaTicketSimple } from "react-icons/fa6";

export default function TicketForm() {
    const { register, watch, formState: { errors } } = useFormContext();

    return (
        <Stack>
            <Checkbox {...register('has_external_ticket')} isChecked={watch('has_external_ticket')} colorScheme='primary'>O evento será realizado com uso de ingressos?</Checkbox>
            {
                watch('has_external_ticket') && <Stack spacing={4}>

                    <FormControl isInvalid={!!errors?.ticket_redirect_name}>
                        <InputGroup>
                            <InputLeftElement color='gray.300' pointerEvents='none'>
                                <FaTicketSimple />
                            </InputLeftElement>
                            <Input {...register('ticket_partner_name')} placeholder='Nome da empresa fornecedora' />
                        </InputGroup>
                        <FormErrorMessage>{errors?.ticket_redirect_name?.message as string}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.ticket_redirect_name}>
                        <InputGroup>
                            <InputLeftElement color='gray.300' pointerEvents='none'>
                                <ExternalLinkIcon />
                            </InputLeftElement>
                            <Input {...register('ticket_partner_url')} placeholder='Endereço para compra do ingresso' />
                        </InputGroup>
                        <FormErrorMessage>{errors?.ticket_redirect_name?.message as string}</FormErrorMessage>
                    </FormControl>
                </Stack>
            }
        </Stack>
    )
}
