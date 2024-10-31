import Login from '@/components/Login'
import { AuthProvider } from '@/hooks'
import React from 'react'

export default function LoginPage() {
  return (
    <AuthProvider middleware='auth:customer' config={{ loginRoute: '/account/login', startPage: '/store/payment' }}>
        <Login/>
    </AuthProvider>
  )
}
