import { CustomerAuthRepositoryInterface } from '@/repository/Interfaces';
import { container } from '@/repository/inversify.config';
import React, { useEffect } from 'react'


// const customerService = container.get<CustomerAuthRepositoryInterface>("CustomerService");

export default function index() {
    useEffect(() => {
        
    }, [])
  return (
    <div>index</div>
  )
}
