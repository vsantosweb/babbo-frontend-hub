import { ReactNode, RefObject, createContext, useContext, useEffect, useRef, useState } from "react"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import _ from "lodash";
import { SessionHelper } from "@/helpers";

const AlertContext = createContext({});

export function useAlert() {

    const context = useContext(AlertContext);

    return context;
}

type AlertStates = { [key: string]: { title: string; feedback: string; } }


export function AlertProvider({ children }: { children: ReactNode }) {

    const [alertState, setAlertState] = useState<{ [index: string]: any }>({});

    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef: RefObject<any> = useRef();

    const router = useRouter();

    const alertStates: AlertStates  = {

        eventCreated: {
            title: 'Evento catadastro do sucesso.',
            feedback: 'Seu evento será analisado pela nossa equipe, assim que concluído, seu evento estará disponível no site, você será notificado.'
        },
        eventUpdated: {
            title: 'Evento atualizado.',
            feedback: 'Evento atualizado com sucesso.'
        }
    }

    useEffect(() => {

        Object.keys(alertStates).forEach((state, x) => {

            console.log(state, 'asfsa')
            if (SessionHelper.has(state)) {
                setAlertState(alertStates[state])
                onOpen()
            }
        });

    }, []);

    return (

        <AlertContext.Provider value={{}}>
            <AlertDialog
                motionPreset='none'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>{alertState?.title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody> {alertState?.feedback} </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>Entendi</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </AlertContext.Provider>
    )
}