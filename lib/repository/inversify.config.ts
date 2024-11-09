// inversify.config.ts
import { Container } from "inversify";
import { CustomerAuthRepositoryInterface } from '@/interfaces';
import { CustomerMockAuthRepository } from "./Repository/Mock/Customer/CustomerMockAuthRepository";
import { CustomerAuthService } from "./Services/Customer/CustomerAuthService";
import CustomerApiService from "./Repository/Mock/Customer/CustomerApiRepository";

const container = new Container();

// Vincular o repositório escolhido
container.bind<CustomerAuthRepositoryInterface>('CustomerRepository').to(CustomerMockAuthRepository);
// container.bind<CustomerAuthService>("CustomerService").to(CustomerAuthService);

// // Registrar o CustomerService com a injeção do repositório
// container.bind<CustomerAuthService>('CustomerRepository').toDynamicValue((context) => {
//     const repository = context.container.get<CustomerAuthRepositoryInterface>('CustomerRepository');
//     return new CustomerService(repository);
// });

export { container };
