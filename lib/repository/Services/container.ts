import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepositoryInterface, EventRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AuthSerivceApiManager } from '../Services/Api/Manager/AuthSerivceApiManager';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';
import { EventManagerApiService } from './Api/Manager/EventManagerApiService';
import { EventApiService } from './Api/EventApiService';

const container = new Container();

container.bind<EventRepositoryInterface>('event-manager').to(EventManagerApiService);
container.bind<AuthRepositoryInterface>('auth-manager').to(AuthSerivceApiManager);
container.bind<PublicRepositoryInterface>('public').to(PublicEventService);

export default container;
