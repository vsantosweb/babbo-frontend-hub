import { AuthRepositoryInterface } from '@/repository/Interfaces';
import { injectable } from 'inversify';
import { AuthServiceBase } from '../AuthServiceBase';

@injectable()
export class AuthServiceApiAdmin extends AuthServiceBase implements AuthRepositoryInterface
{

  constructor() {
    super('admin');
  }

}
