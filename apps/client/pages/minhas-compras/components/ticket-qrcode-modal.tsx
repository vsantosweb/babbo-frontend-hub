import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Divider,
    Collapse,
    useDisclosure,
    Badge,
    IconButton,
    Flex,
    Heading,
    Stack,
    useColorModeValue as mode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { PurchaseTicketProps } from "../types";
import { useEffect } from "react";

export default function TicketQrCodeModal({ ticket, setSelectedTicket }:
    { ticket: PurchaseTicketProps, setSelectedTicket: (ticket: PurchaseTicketProps | null) => void }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        if (ticket) return onOpen();
        onClose();

    }, [ticket])

    return (
        <Modal onClose={() => {
            onClose()
            setSelectedTicket(null)
        }} isOpen={isOpen} isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
            <ModalContent borderRadius='2xl'>
                <ModalCloseButton />
                <ModalBody p='8'>
                    <Stack spacing='4'>
                        <Heading fontSize={24} fontWeight={'300'}>Ingresso: {ticket.name} </Heading>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg' />
                        {/* <Loader /> */}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
