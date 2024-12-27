import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { Url } from "url";


type AppName = 'client' | 'store' | 'organizer';

type AppProviderProps = {
    children: React.ReactElement
    appName: AppName
}

interface AppContextInterface {
    refresh: boolean
    setRefresh: (value: boolean | ((prev: boolean) => boolean)) => void
    appName: string
    redirectPath: string
    setRedirectPath: (value: string) => void
}

const AppContext = createContext<AppContextInterface | undefined>(undefined)

export function useApp() {

    const context = useContext(AppContext);

    if (!context) throw new Error('useApp must be used within an AppProvider')

    return { ...context }
}

export default function AppProvider({ children, appName }: AppProviderProps) {

    const [refresh, setRefresh] = useState<boolean>(false)

    const [requestModalLogin, setOpentModalLogin] = useState<{ redirect: string, active: boolean, origin?: string } | null>(null);

    const [redirectPath, setRedirectPath] = useState<string>('');

    const router = useRouter()

    const checkRedirectCondition = (action: string) => {

        if (appName === 'store') {
            router.replace(router.asPath, undefined, { scroll: false });
            window.location.href = router.asPath;
            return;
        } else {

            window.location.href = '/minhas-compras'
        }
    }

    // const openLoginModal = (config: { redirectPath: string, active: boolean, }) => {
    //     switch (appName) {
    //         case 'client':
    //             setModalLoginConfig({ redirect: router.asPath, active: true })
    //             break;
    //         case 'store':
    //             if (origin === 'payment') {
    //                 setModalLoginConfig({ redirect: '/payment', active: true })
    //             } else {
    //                 setModalLoginConfig({ redirect: router.asPath, active: true })
    //             }

    //         default:
    //             break;
    //     }
    // }

    return (
        <AppContext.Provider value={{
            refresh, setRefresh,
            appName,
            redirectPath,
            setRedirectPath

        }}>
            {children}
        </AppContext.Provider>
    )
}
