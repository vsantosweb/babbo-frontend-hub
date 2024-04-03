import Cookie from 'js-cookie';
import axios from 'axios';

// type apiType = 'public' | null

// export default function api(type: apiType = null) {

//     const baseURL = type ? process.env.NEXT_PUBLIC_URL_API : process.env.NEXT_PUBLIC_URL_API_CLIENT

//     const api = axios.create({ baseURL: baseURL });

//     api.interceptors.request.use(function (config) {

//         const userIdentifier = localStorage.getItem('user_identifier');

//         if (Cookie.get('token')) {
//             config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
//         }

//         if (userIdentifier) {
//             config.headers['X-User-Identifier'] = userIdentifier;
//         }

//         return config;

//     });

//     return api
// }

export type ServiceContainerType = 'admin' | 'client' | 'public' | 'manager';

export default class ApiService {
  private static baseURL: string | undefined;

  public static configure(serviceContainer: ServiceContainerType) {

    ApiService.baseURL = process.env.NEXT_PUBLIC_URL_API;

    const api = axios.create({
      baseURL: `${this.baseURL}/${serviceContainer}`,
    });

    api.interceptors.request.use(function (config) {
      const userIdentifier = localStorage.getItem('user_identifier');

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
