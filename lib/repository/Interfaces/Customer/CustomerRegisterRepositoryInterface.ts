import { EventRepositoryInterface } from '@/interfaces';

export interface CustomerRegisterRepositoryInterface {

    basicOrganizerRegister(payload: Record<string, any>): Promise<any>
}
