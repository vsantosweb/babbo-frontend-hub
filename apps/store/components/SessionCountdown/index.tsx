import React, { useEffect, useState } from 'react'
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { CiClock2 } from 'react-icons/ci'
import moment from 'moment'
import { useCart } from '@/hooks';
export default function SessionCountdown() {

    const { duration } = useCart();

    return (
        <Alert status='success' colorScheme='gray' border='solid 1px #eee'>
            <CiClock2 fontSize='24px' />
            <AlertTitle ml='2'>Sua sessão expira em</AlertTitle>
            <AlertDescription>{duration}</AlertDescription>
        </Alert>
    )
}
