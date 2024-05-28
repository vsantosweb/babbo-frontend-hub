import 'reflect-metadata';
import { Container } from 'inversify';
import { AdminBaseRepositoryInterface, AdminCustomertRepositoryInterface, AdminEventRepositoryInterface, AuthRepositoryInterface, CustomerProfileRepositoryInterface, CustomerRegisterRepositoryInterface, EventRepositoryInterface, PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AuthServiceApiCustomer } from './Api/Customer/AuthServiceApiCustomer';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';
import { EventManagerApiService } from './Api/Customer/EventManagerApiService';
import { EventApiService } from './Api/EventApiService';
import { CustomerProfileApiService } from './Api/Customer/CustomerProfileApiService';
import { PublicOrganizerService } from './Api/Public/PublicOrganizerService';
import { CustomerRegisterApiService } from './Api/Customer/CustomerRegisterApiService';
import { AuthServiceApiAdmin } from './Api/Admin/AuthServiceApiAdmin';
import { CustomerServiceApiAdmin } from './Api/Admin/CustomerServiceApiAdmin';
import { EventServiceApiAdmin } from './Api/Admin/EventServiceApiAdmin';

const container = new Container();


// ** Customer
container.bind<CustomerProfileRepositoryInterface>('customer-profile').to(CustomerProfileApiService);
container.bind<CustomerRegisterRepositoryInterface>('customer-register').to(CustomerRegisterApiService);
container.bind<EventRepositoryInterface>('customer-event').to(EventManagerApiService);

// ** Auth
container.bind<AuthRepositoryInterface>('auth:manager').to(AuthServiceApiCustomer);
container.bind<AuthRepositoryInterface>('auth:admin').to(AuthServiceApiAdmin);

// ** Public
container.bind<PublicRepositoryInterface>('public').to(PublicEventService);
container.bind<PublicOrganizerRepositoryInterface>('public-organizer').to(PublicOrganizerService);

// ** Admin
container.bind<AdminCustomertRepositoryInterface>('admin-customer').to(CustomerServiceApiAdmin);
container.bind<AdminEventRepositoryInterface>('admin-event').to(EventServiceApiAdmin);


export default container;
