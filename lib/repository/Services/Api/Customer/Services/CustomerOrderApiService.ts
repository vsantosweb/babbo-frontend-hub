import { ApiResponseType, CredentialsType, PaymentMethodType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { CustomerCartInterface } from '../Interfaces/CustomerCartInterface';
import ApiService from '../..';
import { CustomerOrderInterface } from '../Interfaces/CustomerOrderInterface';

@injectable()
export class CustomerOrderApiService implements CustomerOrderInterface {

  protected api: AxiosInstance;

  constructor() {
    this.api = ApiService.configure('customer');
  }

  async create(payload: PaymentMethodType): Promise<ApiResponseType | null> {

    return await this.api.post('/orders', payload);

  }

  async tickets(): Promise<ApiResponseType | null> {

    return await this.api.get('/tickets');

  }


}
