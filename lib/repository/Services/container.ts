import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthRepositoryInterface, CustomerProfileRepositoryInterface, CustomerRegisterRepositoryInterface, EventRepositoryInterface, PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AuthServiceApiCustomer } from './Api/Customer/AuthServiceApiCustomer';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';
import { EventManagerApiService } from './Api/Customer/EventManagerApiService';
import { EventApiService } from './Api/EventApiService';
import { CustomerProfileApiService } from './Api/Customer/CustomerProfileApiService';
import { PublicOrganizerService } from './Api/Public/PublicOrganizerService';
import { CustomerRegisterApiService } from './Api/Customer/CustomerRegisterApiService';

const container = new Container();

container.bind<EventRepositoryInterface>('customer-event').to(EventManagerApiService);
container.bind<CustomerProfileRepositoryInterface>('customer-profile').to(CustomerProfileApiService);
container.bind<AuthRepositoryInterface>('auth-manager').to(AuthServiceApiCustomer);
container.bind<PublicRepositoryInterface>('public').to(PublicEventService);
container.bind<PublicOrganizerRepositoryInterface>('public-organizer').to(PublicOrganizerService);
container.bind<CustomerRegisterRepositoryInterface>('customer-register').to(CustomerRegisterApiService);

export default container;
