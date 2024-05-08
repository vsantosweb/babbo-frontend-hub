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

    api.interceptors.request.use(async function (config) {

      if (Cookie.get('token')) {
        config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
      }

      // Verifica se está no lado do cliente
      if (typeof window !== 'undefined') {
        // Se estiver no lado do cliente, acessa o localStorage normalmente
        const userIdentifier = localStorage.getItem('user_identifier');
        if (userIdentifier) {
          config.headers['X-User-Identifier'] = userIdentifier;
        }
      } else {
        // Aqui você pode implementar a lógica para acessar o identificador do usuário no lado do servidor
        // Por exemplo, acessar cookies HTTP ou passar o identificador do usuário como um parâmetro de função
        const userIdentifier = (await fetch(ApiService.baseURL + '/public/user-identifier')).json(); // Substitua por sua lógica real para obter o identificador do usuário no servidor

        const { user_identifier } = await userIdentifier;

        if (user_identifier) {
          config.headers['X-User-Identifier'] = user_identifier;
        }
      }

      return config;
    });


    return api;
  }
}
