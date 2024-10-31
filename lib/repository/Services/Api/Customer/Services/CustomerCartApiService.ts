import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { CustomerCartInterface } from '../Interfaces/CustomerCartInterface';
import ApiService from '../..';

@injectable()
export class CustomerCartApiService implements CustomerCartInterface {

  protected api: AxiosInstance;

  constructor() {
    this.api = ApiService.configure('customer');
  }

  async addCartItems(payload: CredentialsType): Promise<ApiResponseType | null> {

    return await this.api.post('/carts', payload);
    
  }

  async getCart(): Promise<ApiResponseType | null> {

    return await this.api.get('/carts');
    
  }
}
