import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { CustomerCartInterface } from '@/interfaces';
import ApiService from '../service';
import CustomerApiService from './CustomerApiService';

@injectable()
export class CustomerCartApiService extends CustomerApiService implements CustomerCartInterface {

  constructor() {
    super('customer')
  }

  async addCartItems(payload: CredentialsType): Promise<ApiResponseType | null> {

    return await this.api.post('/carts', payload);
    
  }

  async getCart(): Promise<ApiResponseType | null> {

    return await this.api.get('/carts');
    
  }
}
