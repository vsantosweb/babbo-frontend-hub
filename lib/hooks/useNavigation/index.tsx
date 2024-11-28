import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

type NavigationProviderProps = {
    children: React.ReactNode[] | null
}

interface NavigationContextInterface extends UseDisclosureProps {}

const NavigationContext = createContext<NavigationContextInterface | undefined>(undefined)

export function useNavigation() {

    const context = useContext(NavigationContext);

    if (!context) throw new Error('useNavigation must be used within an NavigationProvider')

    return { ...context }
}

export default function NavigationProvider({ children }: NavigationProviderProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <NavigationContext.Provider value={{ isOpen, onOpen, onClose }}>
            {children}
        </NavigationContext.Provider>
    )
}
