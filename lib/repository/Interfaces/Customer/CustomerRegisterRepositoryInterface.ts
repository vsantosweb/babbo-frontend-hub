import { EventRepositoryInterface } from '@/repository/Interfaces';

export interface CustomerRegisterRepositoryInterface {

    basicOrganizerRegister(payload: Record<string, any>): Promise<any>
}
