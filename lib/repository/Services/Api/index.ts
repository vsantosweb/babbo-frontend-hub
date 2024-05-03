import Cookie from 'js-cookie';
import axios from 'axios';

export type ServiceContainerType = 'admin' | 'public' | 'customer';

export default class ApiService {

  private static baseURL: string | undefined;

  public static configure(serviceContainer: ServiceContainerType) {

    ApiService.baseURL = process.env.NEXT_PUBLIC_URL_API;

    const api = axios.create({
      baseURL: `${this.baseURL}/${serviceContainer}`,
    });

    api.interceptors.request.use(async  function (config) {
      // Acessando localStorage de forma assíncrona
      const userIdentifier = await new Promise<string | null>((resolve) => {
        try {
          const userIdentifier = localStorage.getItem('user_identifier');
          resolve(userIdentifier);
        } catch (error) {
          resolve(null);
        }
      });

      if (Cookie.get('token')) {
        config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
      }

      if (userIdentifier) {
        config.headers['X-User-Identifier'] = userIdentifier;
      }

      return config;
    });

    return api;
  }
}
