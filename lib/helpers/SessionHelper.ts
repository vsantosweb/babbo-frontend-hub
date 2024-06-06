
export type RedirectWithSessionType = {
  type?: string,
  status?: string,
  text?: string
}

interface SessionHelperInterface {
  redirectWith: (destination: string, key: string, data?: string | Record<string, any>) => void
  withMessage: (key: string, data?: string | Record<string, any>) => void
  has: (key: string) => boolean | any
}

export const SessionHelper: SessionHelperInterface = {

  redirectWith: (destination: string, key: string, data?: string | Record<string, any>) => {

    // Armazenar a mensagem no sessionStorage
    sessionStorage.setItem(key, JSON.stringify(data));
    
    // Redirecionar para outra página
    location.href = destination;
  },

  withMessage: (key: string, data?: string | Record<string, any>) => {
    // Armazenar a mensagem no sessionStorage
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  
  has: (key: string) => {

    const message = sessionStorage.getItem(key);
  
    if (message) {
      
      setTimeout(() => {
        sessionStorage.removeItem(key)
      }, 3500);

      return message;
    }
  
    return false;
  
  }
}



