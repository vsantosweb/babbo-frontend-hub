import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Checkbox, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import Ticket from "apps/manager/pages/events/ticket";
import { useFormContext } from "react-hook-form";
import { FaTicketSimple } from "react-icons/fa6";

export default function TicketForm() {
    const { register, watch, formState: { errors } } = useFormContext();

    return (
        <Stack>
            {/* <Checkbox {...register('tickets_for_sale')} isChecked={watch('tickets_for_sale')} colorScheme='primary'>Vender ingressos no Babbo</Checkbox> */}
            {watch('tickets_for_sale') && <Ticket />}

            <Checkbox {...register('has_external_ticket')} isChecked={watch('has_external_ticket')} colorScheme='primary'>Vendas de ingressos com site parceiro</Checkbox>
            {
                watch('has_external_ticket') && <Stack spacing={4}>

                    <FormControl isInvalid={!!errors?.ticket_partner_name}>
                        <InputGroup>
                            <InputLeftElement color='gray.300' pointerEvents='none'>
                                <FaTicketSimple />
                            </InputLeftElement>
                            <Input {...register('ticket_partner_name')} placeholder='Nome da empresa fornecedora' />
                        </InputGroup>
                        <FormErrorMessage>{errors?.ticket_partner_name?.message as string}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.ticket_partner_url}>
                        <InputGroup>
                            <InputLeftElement color='gray.300' pointerEvents='none'>
                                <ExternalLinkIcon />
                            </InputLeftElement>
                            <Input {...register('ticket_partner_url')} placeholder='Link para compra do ingresso' />
                        </InputGroup>
                        <FormErrorMessage>{errors?.ticket_partner_url?.message as string}</FormErrorMessage>
                    </FormControl>
                </Stack>
            }


        </Stack>
    )
}
