import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import Login from '../Login'
import { useEffect } from 'react'

export function LoginModal({ open, setRequestLogin }: { open: boolean, setRequestLogin: (status: {redirect: string, active: boolean} | null) => void }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        open && onOpen()
    }, [open])

    return (
        <Modal  onClose={() => {
            onClose()
            setRequestLogin(null)

        }} isOpen={isOpen} isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
            <ModalContent borderRadius='2xl'>
                <ModalCloseButton />
                <ModalBody p='8'>
                    <Stack spacing='4'>
                        <Heading fontSize={24} fontWeight={'300'}>Bem-vindo ao Babbo</Heading>
                        <Login />
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}