import { ApiResponseType, CredentialsType } from '@/types';
import { injectable } from 'inversify';
import { CustomerCartRepositoryInterface } from '@/interfaces';
import CustomerApiService from './CustomerApiService';

@injectable()
export class CustomerCartApiService extends CustomerApiService implements CustomerCartRepositoryInterface {

  constructor() {
    super('customer')
  }

  async addCartItems(payload: CredentialsType): Promise<ApiResponseType | null> {

    return await this.api.post('/carts', payload);

  }

  async deleteCart(id: number): Promise<ApiResponseType | null> {

    return await this.api.delete('/carts/' + id);

  }

  async getCart(): Promise<ApiResponseType | null> {

    return await this.api.get('/carts');

  }
}
