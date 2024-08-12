import React from 'react'
import { Cart } from './components/Cart'
import Layout from '@/layouts'

export default function index() {
    return (
        <Layout
            title={'Babbo Eventos'}
            name={'client'}
        >
            <Cart />
        </Layout>

    )
}
