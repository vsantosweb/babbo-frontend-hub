import Cookie from 'js-cookie';
import axios from 'axios';

export type ServiceContainerType = 'admin' | 'public' | 'customer' | 'store';

export default class ApiService {

  private static baseURL: string | undefined;

  public static configure(serviceContainer: ServiceContainerType) {

    ApiService.baseURL = process.env.NEXT_PUBLIC_URL_API;
    
    const api = axios.create({ baseURL: `${this.baseURL}/${serviceContainer}` });

    api.interceptors.request.use(async function (config) {

      if (Cookie.get('token')) {
        config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
      }

      // Verifica se está no lado do cliente
      if (typeof window !== 'undefined') {

        // Se estiver no lado do cliente, acessa o localStorage normalmente
        const userIdentifier = localStorage.getItem('user_identifier');
        const token = Cookie.get('token');
        if (userIdentifier) {
          config.headers['X-User-Identifier'] = userIdentifier;
        }

      } else {
        
        const userIdentifier = (await axios.get(ApiService.baseURL + '/public/user-identifier')).data; 

        const { user_identifier } = userIdentifier;

        if (user_identifier) {
          config.headers['X-User-Identifier'] = user_identifier;

        }
      }

      return config;
    });


    return api;
  }
}
