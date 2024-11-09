import { AuthRepositoryInterface, CustomerRegisterRepositoryInterface } from '@/interfaces';
import { ApiResponseType, CredentialsType, ResetPasswordType } from '@/types';
import { AxiosInstance } from 'axios';
import ApiService from '../service';
import { injectable } from 'inversify';

@injectable()
export class CustomerRegisterApiService implements CustomerRegisterRepositoryInterface {

  protected api: AxiosInstance;

  constructor() {
    this.api = ApiService.configure('customer');
  }

  async basicOrganizerRegister(payload: CredentialsType): Promise<ApiResponseType | null> {

    return await this.api.post('/auth/basic-organizer-register', payload);
    
  }
}
