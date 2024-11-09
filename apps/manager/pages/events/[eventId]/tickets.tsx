'use client-'
import React, { useEffect, useState } from "react";
import {
    Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
    Text, Stack, Badge, Table, Thead, Tbody, Tr, Th, Td, Progress,
    Flex,
    Button,
    StackDivider,
    useDisclosure,
    Heading,
    HStack,
    Switch,

} from "@chakra-ui/react";
import Layout from "@/layouts";
import Datebox from "@/components/Datebox";
import { FiEdit2 } from "react-icons/fi";
import { FaTicket } from "react-icons/fa6";
import { SessionForm } from "./ticket/forms/session-form";
import { BatchForm } from "./ticket/forms/batch-form";
import { NextPage } from "next";
import { useApp, useEvent } from "@/hooks";
import { ModalForm } from "./ticket/forms/modal-form";
import { EventSessionType, EventTicketBatchType, EventTicketType } from "@/types";
import { EditIcon } from "@chakra-ui/icons";
import { MenuAction } from "@/components";
import { FaTrash } from "react-icons/fa";
import { TicketForm } from "./ticket/forms/ticket-form";

const TicketPage: NextPage = () => {

    const sessionFormModal = useDisclosure();
    const batchFormModal = useDisclosure();
    const ticketFormModal = useDisclosure();

    const [eventSessions, setEventSessons] = useState<EventSessionType[] | []>([]);
    const [session, setSession] = useState<EventSessionType | null>(null);
    const [batch, setBatch] = useState<EventTicketBatchType | null>(null);
    const [ticket, setTicket] = useState<EventTicketType | null>(null);
    const [sessionId, setSessionId] = useState<number>();

    const { refresh, setRefresh } = useApp();
    const { getSessions, event, handleDeleteSession, handleDeleteBatch, handleDeleteTicket } = useEvent();

    useEffect(() => {
        if (event) {
            getSessions(event.id).then(response => {
                setEventSessons(response.data)
                sessionFormModal.onClose()
                batchFormModal.onClose()
                ticketFormModal.onClose()
            })
        }
    }, [event, refresh])

    const editSession = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        sessionFormModal.onOpen()
    }

    const deleteSession = () => {
        (event && session) && handleDeleteSession(event?.id, session?.id).then(() => {
            setRefresh(prev => !prev)
            setSession(null)
        })
    }

    const editBatch = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        batchFormModal.onOpen()
    }

    const deleteBatch = () => {
        batch?.id && session && handleDeleteBatch(session?.id, batch?.id).then(() => {
            setRefresh(prev => !prev)
            setBatch(null)
        })
    }

    const editTicket = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation()
        ticketFormModal.onOpen()
    }

    const deleteTicket = () => {

        ticket?.id && session?.id && handleDeleteTicket(session?.id, ticket?.id).then(() => {
            setRefresh(prev => !prev)
            setBatch(null)
        })
    }

    const sessionActions = [
        { label: 'Editar sessão', icon: EditIcon, action: editSession },
        { label: 'Excluir sessão', icon: FaTrash, action: deleteSession }
    ]
    const batchActions = [
        { label: 'Editar lote', icon: EditIcon, action: editBatch },
        { label: 'Excluir lote', icon: FaTrash, action: deleteBatch }
    ]
    const ticketActions = [
        { label: 'Editar ingresso', icon: EditIcon, action: editTicket },
        { label: 'Excluir ingresso', icon: FaTrash, action: deleteTicket }
    ]

    return (
        <Layout name='manager'>
            <Stack spacing='4'>
                <HStack alignItems='center' w='100%'>

                    <ModalForm control={sessionFormModal} form={<SessionForm eventSession={session} />} />
                    <ModalForm control={batchFormModal} form={<BatchForm batch={batch} />} />
                    <ModalForm control={ticketFormModal} form={<TicketForm sessionId={sessionId} ticket={ticket} />} />
                    <Heading flex='1'>Meus ingressos</Heading>
                    <Button alignSelf='flex-end' onClick={sessionFormModal.onOpen}>Adicionar sessão</Button>
                </HStack>
                <Accordion allowToggle p='0' borderRadius='md' reduceMotion>
                    {eventSessions.map(session => (
                        <AccordionItem boxShadow='md' mb='4' key={session.id} p='0' borderWidth='1px' borderRadius='md'>
                            <Flex alignItems='start'>
                                <AccordionButton pl='0'>
                                    <Flex flex="1" gap='2' alignItems='center'>
                                        <Datebox date={session.event_date} />
                                        <Stack textAlign="left">
                                            <Heading size='md'>{session.name}</Heading>
                                            <Text>{session.event_date}</Text>
                                        </Stack>
                                    </Flex>
                                </AccordionButton>
                                <MenuAction onSelect={() => setSession(session)} options={sessionActions} />
                            </Flex>
                            <AccordionPanel p='0'>
                                <Stack divider={<StackDivider />} borderRadius='lg' spacing={4}>
                                    <Accordion p='4' allowToggle reduceMotion>
                                        <Stack spacing={6}>
                                            <Heading size='md'>Ingressos</Heading>
                                            <Table width='100%' size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Nome</Th>
                                                        <Th>Vendas</Th>
                                                        <Th>Preço</Th>
                                                        <Th>Quantidade disponivel</Th>
                                                        <Th>Tipo</Th>
                                                        <Th>Visibilidade</Th>
                                                        <Th>Código</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {session?.tickets?.map((ticket, index) => ticket ? (
                                                        <Tr w='100%' key={index} _hover={{ cursor: 'pointer' }}>
                                                            <Td width={'20%'}>{ticket.name}</Td>

                                                            <Td >
                                                                <Progress
                                                                    value={(ticket.sales_quantity && ticket.quantity) && (ticket.sales_quantity / ticket.quantity) * 100}
                                                                    size="sm"
                                                                    colorScheme="primary"
                                                                    borderRadius="md"
                                                                />
                                                                <Text fontSize="xs" color="gray.500" textAlign="center" mt={1}>
                                                                    {ticket?.sales_quantity} / {ticket.quantity}
                                                                </Text>
                                                            </Td>
                                                            <Td>R${ticket.price && ticket.price.toFixed(2)}</Td>
                                                            <Td>{ticket?.balance}</Td>

                                                            <Td>{ticket.ticket_type === "paid" ? "Pago" : "Gratuito"}</Td>
                                                            <Td><Switch isChecked={!!ticket.is_visible} size='sm' /></Td>
                                                            <Td>{ticket.code}</Td>
                                                            <Td textAlign='right'>
                                                                <MenuAction onSelect={() => {
                                                                    setTicket(ticket)
                                                                    setSession(session)
                                                                }} options={[
                                                                    { label: 'Editar ingresso', icon: EditIcon, action: editTicket },
                                                                    { label: 'Excluir ingresso', icon: FaTrash, action: deleteTicket, disabled: ticket.is_selling }
                                                                ]} />

                                                            </Td>
                                                        </Tr>
                                                    ) : 'null')}
                                                </Tbody>
                                            </Table>
                                        </Stack>

                                    </Accordion>
                                </Stack>

                                <Stack display={'flex'}>
                                    <Button onClick={() => {
                                        ticketFormModal.onOpen()
                                        setSessionId(session.id)
                                    }} size='sm' mt='4' alignSelf='center' variant='ghost'>Adicionar ingresso</Button>
                                </Stack>

                            </AccordionPanel>
                        </AccordionItem>
                    ))}

                </Accordion>
            </Stack>
        </Layout>
    );
}

export default TicketPage;
