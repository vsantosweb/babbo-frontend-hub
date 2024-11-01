import 'reflect-metadata';
import { Container } from 'inversify';
import { AdminCustomertRepositoryInterface, AdminEventLotRepositoryInterface, AdminEventRepositoryInterface, AdminEventSessionRepositoryInterface, AuthRepositoryInterface, CustomerProfileRepositoryInterface, CustomerRegisterRepositoryInterface, EventRepositoryInterface, PublicOrganizerRepositoryInterface, PublicRepositoryInterface } from '@/interfaces';
import { AuthServiceApiCustomer } from './Api/Customer/AuthServiceApiCustomer';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';
import { EventManagerApiService } from './Api/Customer/EventManagerApiService';
import { CustomerProfileApiService } from './Api/Customer/CustomerProfileApiService';
import { PublicOrganizerService } from './Api/Public/PublicOrganizerService';
import { CustomerRegisterApiService } from './Api/Customer/CustomerRegisterApiService';
import { AuthServiceApiAdmin } from './Api/Admin/AuthServiceApiAdmin';
import { CustomerServiceApiAdmin } from './Api/Admin/CustomerServiceApiAdmin';
import { EventServiceApiAdmin } from './Api/Admin/EventServiceApiAdmin';
import { EventSessionServiceApiAdmin } from './Api/Admin/EventSessionServiceApiAdmin';
import { EventLotServiceApiAdmin } from './Api/Admin/EventLotServiceApiAdmin';

import { StoreEventInterface, StoreEventService} from './Api/Store';
import { CustomerCartInterface } from './Api/Customer/Interfaces/CustomerCartInterface';
import { CustomerCartApiService } from './Api/Customer/Services/CustomerCartApiService';
import { CustomerOrderApiService } from './Api/Customer/Services/CustomerOrderApiService';
import { CustomerOrderInterface } from './Api/Customer/Interfaces/CustomerOrderInterface';

const container = new Container();


// ** Customer
container.bind<CustomerProfileRepositoryInterface>('customer-profile').to(CustomerProfileApiService);
container.bind<CustomerRegisterRepositoryInterface>('customer-register').to(CustomerRegisterApiService);
container.bind<CustomerCartInterface>('customer-cart').to(CustomerCartApiService);
container.bind<CustomerOrderInterface>('customer-order').to(CustomerOrderApiService);


container.bind<EventRepositoryInterface>('customer-event').to(EventManagerApiService);

// ** Auth
container.bind<AuthRepositoryInterface>('auth:manager').to(AuthServiceApiCustomer);
container.bind<AuthRepositoryInterface>('auth:admin').to(AuthServiceApiAdmin);
container.bind<AuthRepositoryInterface>('auth:customer').to(AuthServiceApiCustomer);

// ** Public
container.bind<PublicRepositoryInterface>('public').to(PublicEventService);
container.bind<PublicOrganizerRepositoryInterface>('public-organizer').to(PublicOrganizerService);

// ** Admin
container.bind<AdminCustomertRepositoryInterface>('admin-customer').to(CustomerServiceApiAdmin);
container.bind<AdminEventRepositoryInterface>('admin-event').to(EventServiceApiAdmin);
container.bind<AdminEventSessionRepositoryInterface>('admin-event-session').to(EventSessionServiceApiAdmin);
container.bind<AdminEventLotRepositoryInterface>('admin-event-ticket-lot').to(EventLotServiceApiAdmin);

// ** Store
container.bind<StoreEventInterface>('store-event-service').to(StoreEventService);


export default container;
