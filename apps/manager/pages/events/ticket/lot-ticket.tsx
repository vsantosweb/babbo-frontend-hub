import { DateLabel } from "@/components";
import Layout from "@/layouts";
import { TextArea } from "@adobe/react-spectrum";
import { EditIcon } from "@chakra-ui/icons";
import {
    Box, Button, Checkbox, Divider, Flex, FormControl, FormLabel,
    HStack, Heading, Input, Radio, RadioGroup, Stack, Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormHelperText,
    Text,
    IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { HiTicket } from "react-icons/hi";


export default function TicketLot() {

    const { register, watch, control, getValues, reset } = useForm();

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "test", // unique name for your Field Array
    });


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tickets, setTickets] = useState([]);

    const router = useRouter();

    const handleAddTicket = () => {

        const ticket = getValues('ticket');

        setTickets([...tickets, ticket]);

        onClose();
        reset();
    }
    console.log(tickets, 'tickets')
    return (
        <Layout name="manager">
            {/* <Flex>
                <DateLabel />
                <DateLabel />
                <DateLabel />
            </Flex> */}
            <Stack  m={'auto'} spacing={4} w={'100%'} maxWidth={'600px'}>
                <Heading size={'md'}>Configuração do lote</Heading>



                {/* <RadioGroup >
                        <Radio value={'individual'} {...register('sales_type')}>Individual</Radio>
                        <Radio value={'lot'}{...register('sales_type')}>Por Lote</Radio>
                    </RadioGroup> */}

                {/* <Heading size={'md'}>{watch('sales_type') === 'lot' ? ` Configuração do lote` : 'Configuração do ingresso'}</Heading> */}

               


                <Button onClick={onOpen} variant={'outline'} leftIcon={<FaTicket />}>Adicionar Ingresso</Button>

                <Stack borderRadius={'lg'} minHeight={'100px'}  >
                    {tickets.length > 0 ? <>
                        {tickets.map((ticket, index) => (
                            <Flex p={2} key={index} alignItems={'center'} gap={3} borderRadius={'lg'} border={'dashed 1px'} >
                                <Flex gap={2} flex={1}> <Text size={'sm'}>{ticket.name}</Text></Flex>
                                <Flex gap={2} alignItems={'center'}>
                                    <IconButton size={'sm'} variant={'outline'} aria-label="ticket-delete" icon={<CiTrash fontSize={'1.4em'} />} />
                                    <IconButton size={'sm'} variant={'outline'} aria-label="ticket-delete" icon={<EditIcon fontSize={'1.4em'} />} />
                                </Flex>
                            </Flex>
                        ))}
                    </> :

                        <Flex flex={1} alignItems={'center'} justifyContent={'center'}>

                            <Flex alignItems={'center'} flex={1} justifyContent={'center'} direction={'column'}>
                                <FaTicketAlt fontSize={'1.5em'} />
                                <Text textAlign={'center'} fontSize={'sm'}>
                                    Seus ingressos vão aparecer aqui, cadastre ao menos 1 ingresso para poder continuar...
                                </Text>
                            </Flex>
                        </Flex>
                    }


                </Stack>

                <Button isDisabled={true} onClick={onOpen}>Concluir</Button>


            </Stack>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{watch('ticket.name') || 'Novo ingresso'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Stack spacing={4}>

                            <FormControl>
                                <FormLabel>Título do ingresso</FormLabel>
                                <Input placeholder="Ex: Homem, AREA VIP, Mulher, Unisex..." type={'text'} {...register('ticket.name')} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Tipo de ingresso</FormLabel>
                                <RadioGroup>
                                    <Radio mr={3} value={'paid'} {...register('ticket.ticket_type')}>Pago</Radio>
                                    <Radio value={'free'} {...register('ticket.ticket_type')}>Gratúito</Radio>
                                </RadioGroup>
                            </FormControl>


                            <FormControl>
                                <FormLabel>Quantidade</FormLabel>
                                <Input type={'nubmer'} />
                                <FormHelperText>A quantidade não pode execeder o tamanho do lote</FormHelperText>
                            </FormControl>

                            <>
                                <Heading size={'sm'}>Quantidade por compra</Heading>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Minima</FormLabel>
                                        <Input type={'nubmer'} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Maxima</FormLabel>
                                        <Input type={'nubmer'} />
                                    </FormControl>
                                </HStack>
                            </>

                            <FormControl>
                                <FormLabel>Preço</FormLabel>
                                <Input />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Textarea />
                            </FormControl>
                            <Divider />

                        </Stack>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleAddTicket} >Adicionar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    )
}
