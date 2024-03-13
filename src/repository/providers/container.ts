import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepositoryInterface, EventRepositoryInterface } from '@/interfaces';
import { AuthSerivceApiManager } from '../Services/Api/Manager/AuthSerivceApiManager';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';

const container = new Container();

container.bind<AuthRepositoryInterface>('auth-manager').to(AuthSerivceApiManager);
container.bind<EventRepositoryInterface>('public').to(PublicEventService);
export default container;
