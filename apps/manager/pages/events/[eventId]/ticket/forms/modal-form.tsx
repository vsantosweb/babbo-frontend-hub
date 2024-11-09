import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  UseDisclosureProps,
} from '@chakra-ui/react'
import React from 'react'


type ModalFormProps = {
  control: UseDisclosureProps
  form: JSX.Element
}
export const ModalForm: React.FC<ModalFormProps> = ({ control, form }) => {

  const { isOpen, onOpen, onClose } = control

  return (

    <Modal isCentered isOpen={!!isOpen} onClose={() => onClose && onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{form}</ModalBody>
      </ModalContent>
    </Modal>
  )


}
