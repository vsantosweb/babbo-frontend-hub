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

export function LoginModal({ open, setRequestLogin }: { open: boolean, setRequestLogin: (status:boolean) => void }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        open && onOpen()
        console.log(open,'open')
    }, [open])

    return (
        <Modal size={'sm'} onClose={() => {
            onClose()
            setRequestLogin(false)

        }} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <Login />
            </ModalContent>
        </Modal>
    )
}