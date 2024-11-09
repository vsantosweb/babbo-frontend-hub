import Datebox from "@/components/Datebox";
import Layout from "@/layouts";
import { TextArea } from "@adobe/react-spectrum";
import { EditIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex, FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    HStack,
    FormHelperText,
    RadioGroup,
    Radio,
    Textarea,
    Divider,
    Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { HiTicket } from "react-icons/hi";

export default function Ticket() {

    const { register, watch, control, getValues, reset } = useForm();


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "test", // unique name for your Field Array
    });


    const { isOpen, onOpen, onClose } = useDisclosure()
    const ticketDisclosure = useDisclosure()
    const [tickets, setTickets] = useState<any>([]);

    const router = useRouter();

    const [sessionDates, setSessionDates] = useState<string[]>()

    const handleAddTicket = () => {

        const ticket = getValues('ticket');

        // setTickets([...tickets, ticket]);

        onClose();
        reset();
    }

    return (
        <Layout name='manager'>
            <Stack mx={'auto'} spacing={4} p={4} w={'100%'} >

                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent borderRadius={'3xl'}>

                        <ModalHeader>Selecione o dia do evento</ModalHeader>

                        <ModalCloseButton />
                        <ModalBody>

                            <FormControl >
                                <RadioGroup >
                                    <FormLabel>Tipo de venda</FormLabel>
                                    <FormHelperText mb={3}>Caso o evento tenha apenas 1 lote, crie apenas o lote que irá realizar suas vendas.</FormHelperText>
                                    <HStack>
                                        <Radio value={'individual'} {...register('sale_type')}>Individual</Radio>
                                        <Radio value={'lot'}{...register('sale_type')}>Por lote</Radio>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Data do evento</FormLabel>
                                <Input {...register('date')} type={'date'} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nome do lote</FormLabel>
                                <Input {...register('name')} type={'text'} placeholder={'Ex: Primeiro Lote, Lote único, Ingressos à venda...'} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quantidade</FormLabel>
                                <Input {...register('quantity')} placeholder='Quantidade total para este lote' type={'nubmer'} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Inicio das vendas</FormLabel>
                                <Input type={'datetime-local'} {...register('start_date')} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Encerramento das vendas</FormLabel>
                                <Input type={'datetime-local'} {...register('end_date')} />
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>Adicionar lote</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Heading size={'md'}>Gerenciador de ingressos</Heading>
                <Text>
                    Bem-vindo ao gerenciador de ingressos, aqui você poderá configurar a
                    data de venda, criar ingressos por lote ou individuais.
                </Text>

                <Flex w={'100%'} gap={4} gridColumn={'3'} overflowX={'auto'}>
                    <Box w={'200px'}>
                        <Datebox date={'2024-04-01'} />
                    </Box>
                    <Box w={'200px'}>
                        <Datebox date={'2024-04-01'} />
                    </Box>
                    <Flex minWidth={'120px'} onClick={onOpen} as={'button'} borderRadius={'xl'} border={'dashed 1px'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                        <Flex height={'100%'} direction={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                            <FaPlus />
                            <Text fontSize={'xs'}>Adicionar</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Text>Se o seu evento tiver mais de uma sessão, os lotes ficarão agrupados nas suas respectivas datas</Text>
                <div>
                    <Button onClick={ticketDisclosure.onOpen} variant={'outline'} leftIcon={<FaTicket />}>Adicionar Ingresso</Button>
                </div>

                <Stack borderRadius={'lg'} minHeight={'100px'}  >
                    {tickets.length > 0 ? <>
                        {tickets.map((ticket: any, index: any) => (
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

                <Modal isCentered isOpen={ticketDisclosure.isOpen} onClose={ticketDisclosure.onClose}>
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
                            <Button onClick={handleAddTicket}>Adicionar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
        </Layout>
    )
}
