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

const AdminContext = createContext<any>({});

export function useAdmin() {


    const context = useContext(AdminContext);

    return { ...context };
}

type AlertStates = { [key: string]: { title: string; feedback: string; status?: string } }


export function AdminProvider({ children }: { children: ReactNode }) {

    const disclosure = useDisclosure()

    const router = useRouter();

    const checkIsAdmin = (isAdmin: boolean) => {
        
        if (!isAdmin) {
            disclosure.onOpen()
            return;
        }

        router.push('/events/create')
    }

    return (

        <AdminContext.Provider value={{ checkIsAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}
