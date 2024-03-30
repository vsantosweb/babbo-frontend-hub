import { Session } from 'inspector';
import { useRouter } from 'next/router';


export type RedirectWithSessionType = {
  type?: string,
  status?: string,
  text?: string
}

interface SessionHelperInterface {

  redirectWith: (destination: string, key: string, data?: RedirectWithSessionType) => void
  has: (key: string) => boolean | any
}

export const SessionHelper: SessionHelperInterface = {

  redirectWith: (destination: string, key: string, data?: RedirectWithSessionType) => {

    // Armazenar a mensagem no sessionStorage
    sessionStorage.setItem(key, JSON.stringify(data));
    console.log(destination, 'destination')
    // Redirecionar para outra página
    location.replace(destination)
  },

  has: (key: string) => {

    const message = sessionStorage.getItem(key);
  
    if (message) {
      sessionStorage.removeItem(key);
      return message;
    }
  
    return false;
  
  }
}



