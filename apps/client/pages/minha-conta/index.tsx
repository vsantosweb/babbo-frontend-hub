import React from 'react'
import ProfileForm from './profile-form'
import Layout from '@/layouts'
import { Heading, Stack } from '@chakra-ui/react'
import BasicProfileForm from './basic-profile-form'

export default function MyAccount() {
    return (
        <Layout name='client'>
            <Stack spacing={8} py='6' my='0' className='app-wrapper'>
                <Heading>Minha Conta</Heading>
                {/* <ProfileForm /> */}
                <BasicProfileForm/>
            </Stack>
        </Layout>
    )
}
