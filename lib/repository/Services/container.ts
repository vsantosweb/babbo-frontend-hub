import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthServiceApiCustomer } from './Api/Customer/CustomerAuthService';
import { PublicEventService } from '../Services/Api/Public/PublicEventService';
import { EventManagerApiService } from './Api/Customer/CustomerEventApiService';
import { CustomerProfileApiService } from './Api/Customer/CustomerProfileApiService';
import { PublicOrganizerService } from './Api/Public/PublicOrganizerService';
import { CustomerRegisterApiService } from './Api/Customer/CustomerRegisterApiService';
import { AuthServiceApiAdmin } from './Api/Admin/AuthServiceApiAdmin';
import { CustomerServiceApiAdmin } from './Api/Admin/CustomerServiceApiAdmin';
import { EventServiceApiAdmin } from './Api/Admin/EventServiceApiAdmin';
import { EventSessionServiceApiAdmin } from './Api/Admin/EventSessionServiceApiAdmin';
import { EventLotServiceApiAdmin } from './Api/Admin/EventLotServiceApiAdmin';

import {
    StoreRepositoryInterface,
    AdminCustomertRepositoryInterface,
    AdminEventLotRepositoryInterface,
    AdminEventRepositoryInterface,
    AdminEventSessionRepositoryInterface,
    AuthRepositoryInterface,
    CustomerProfileRepositoryInterface,
    CustomerRegisterRepositoryInterface,
    EventRepositoryInterface,
    PublicOrganizerRepositoryInterface,
    PublicRepositoryInterface,
    CustomerCartInterface,
    CustomerOrderRepositoryInterface,
    CustomerEventTicketRepositoryInterface,
    EventSessionRepositoryInterface,
    EventTicketBatchRepositoryInterface,
    EventTicketRepositoryInterface
} from '@/interfaces';

import {
    CustomerCartApiService,
    CustomerOrderApiService,
    CustomerEventTicketApiService,
    CustomerEventSessionService,
    CustomerEventTicketBatchApiService,
    
} from '@/services';
import { StoreEventService } from './Api/Store/StoreEventService';

const container = new Container();


// ** Customer
container.bind<CustomerProfileRepositoryInterface>('customer-profile').to(CustomerProfileApiService);
container.bind<CustomerRegisterRepositoryInterface>('customer-register').to(CustomerRegisterApiService);
container.bind<CustomerCartInterface>('customer-cart').to(CustomerCartApiService);
container.bind<CustomerOrderRepositoryInterface>('customer-order').to(CustomerOrderApiService);
container.bind<EventSessionRepositoryInterface>('customer-event-session').to(CustomerEventSessionService)
container.bind<EventTicketBatchRepositoryInterface>('customer-event-batch').to(CustomerEventTicketBatchApiService)
container.bind<EventTicketRepositoryInterface>('customer-event-ticket').to(CustomerEventTicketApiService)

container.bind<EventRepositoryInterface>('customer-event').to(EventManagerApiService);

// ** Auth
container.bind<AuthRepositoryInterface>('auth:manager').to(AuthServiceApiCustomer);
// container.bind<AuthRepositoryInterface>('auth:admin').to(AuthServiceApiAdmin);
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
container.bind<StoreRepositoryInterface>('store-event-service').to(StoreEventService);

//** Event

export default container;
