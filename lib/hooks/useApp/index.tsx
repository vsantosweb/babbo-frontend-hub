import { createContext, useContext, useState } from "react";

type AppProviderProps = {
    children: JSX.Element
}

interface AppContextInterface {
    refresh: boolean
    setRefresh: (value: boolean | ((prev: boolean) => boolean)) => void;
}
const AppContext = createContext<AppContextInterface | undefined>(undefined)

export function useApp() {

    const context = useContext(AppContext);

    if (!context) throw new Error('useApp must be used within an AppProvider')

    return { ...context }
}

export default function AppProvider({ children }: AppProviderProps) {

    const [refresh, setRefresh] = useState<boolean>(false)

    return (
        <AppContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </AppContext.Provider>
    )
}
