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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Link
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import _ from "lodash";
import { SessionHelper } from "@/helpers";

const AlertContext = createContext<any>({});

export function useAlert() {

    const context = useContext(AlertContext);

    return { ...context };
}

type AlertStates = { [key: string]: { title: string; feedback: string; status?: string } }


export function AlertProvider({ children }: { children: ReactNode }) {

    const [alertState, setAlertState] = useState<{ [index: string]: any } | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const cancelRef: RefObject<any> = useRef();

    const router = useRouter();

    const alertStates: AlertStates = {

        eventCreated: {
            status: 'success',
            title: 'Evento ',
            feedback: 'foi criado com sucesso. Vamos fazer uma análise e disponibiliza-lo na plataforma em até 24h.'
        },
        eventUpdated: {
            status: 'info',
            title: 'Evento ',
            feedback: 'foi atualizado.'
        },
        eventDeleted: {
            status: 'error',
            title: 'Evento',
            feedback: 'excluído.'
        }
    }

    useEffect(() => {

        getAlertMessage();

    }, []);

    const getAlertMessage = () => {

        let session;

        Object.keys(alertStates).forEach((state, x) => {

            session = SessionHelper.has(state);

            if (session) {
                setAlertState({ ...alertStates[state], data: JSON.parse(session) });
                return;
            }
        });

    }

    const AlertMessage = () => {
        console.log(alertState, 'alertState')
        return alertState && (
            <Alert status={alertState.status}>
                <AlertIcon />
                <AlertTitle>{alertState?.title}</AlertTitle>
                <AlertDescription dangerouslySetInnerHTML={{ __html: alertState.data }} />
            </Alert>
        )
    }
    return (

        <AlertContext.Provider value={{ AlertMessage }}>
            {/* <AlertDialog
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
            </AlertDialog> */}
            {children}
        </AlertContext.Provider>
    )
}