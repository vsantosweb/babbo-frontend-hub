import { GetServerSidePropsContext } from "next/types";
import CustomerForm from "../form";
import container from "@/container";

import { AdminCustomertRepositoryInterface, AdminEventRepositoryInterface } from '@/interfaces';
import { EventInterface } from '@/types';

const adminEventService = container.get<AdminEventRepositoryInterface>('admin-event');
const adminCustomerService = container.get<AdminCustomertRepositoryInterface>('admin-customer');


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { query } = context;

    const id: string = query?.uuid as string

    const customer = await adminCustomerService.show(id);

    return {
        props: {
            customer: customer.data
        }
    };
}

export default function EditEvent({ customer }: { customer: Record<string, any> }) {

    console.log(customer, 'customercustomercustomer')
    return (
        <CustomerForm customer={customer} />
    )
}
