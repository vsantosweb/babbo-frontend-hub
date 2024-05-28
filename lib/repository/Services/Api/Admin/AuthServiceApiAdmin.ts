import { AuthRepositoryInterface } from '@/interfaces';
import { injectable } from 'inversify';
import { AuthServiceBase } from '../AuthServiceBase';

@injectable()
export class AuthServiceApiAdmin extends AuthServiceBase implements AuthRepositoryInterface
{

  constructor() {
    super('admin');
  }

}
