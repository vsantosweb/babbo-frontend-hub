import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AuthSerivceApiManager } from '../Services/Api/Manager/AuthSerivceApiManager';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';

const container = new Container();

container.bind<AuthRepositoryInterface>('manager').to(AuthSerivceApiManager);
container.bind<PublicRepositoryInterface>('public').to(PublicEventService);

export default container;
