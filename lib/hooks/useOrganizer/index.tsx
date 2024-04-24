import { ReactNode, RefObject, createContext, useContext, useEffect, useRef, useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import _ from "lodash";
import { SessionHelper } from "@/helpers";
import { OrganizerBasicForm } from "@/themes/babbo";

const OrganizerContext = createContext<any>({});

export function useOrganizer() {


    const context = useContext(OrganizerContext);

    return { ...context };
}

type AlertStates = { [key: string]: { title: string; feedback: string; status?: string } }


export function OrganizerProvider({ children }: { children: ReactNode }) {

    const disclosure = useDisclosure()

    const router = useRouter();

    const checkCustomerIsOrganizer = (isOrganizer: boolean) => {

        if (!isOrganizer) {
            disclosure.onOpen()
            return;
        }

        router.push('/events/create')
    }

    return (

        <OrganizerContext.Provider value={{ checkCustomerIsOrganizer }}>

            <Modal closeOnOverlayClick={false} isCentered size={'2xl'} isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={'3xl'}>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        <OrganizerBasicForm disclosure={disclosure} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {children}
        </OrganizerContext.Provider>
    )
}