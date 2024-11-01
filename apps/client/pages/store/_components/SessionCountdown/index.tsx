import React, { useEffect, useState } from 'react'
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { CiClock2 } from 'react-icons/ci'
import moment from 'moment'
export default function SessionCountdown({ date }: { date: string }) {

    const [duration, setDuration] = useState(date);
    
    const expireAt = moment('2024-10-31 15:00');
    const now = moment();
    const durationTime = moment.duration(expireAt.diff(now));

    useEffect(() => {
  
        const countDown = setInterval(() => {
            setDuration(`${durationTime.minutes()}:${durationTime.seconds()}`);

        }, 1000)

        return () => clearInterval(countDown);

    },[date, duration])
    
    return (
        <Alert status='success' colorScheme='gray' border='solid 1px #eee'>
            <CiClock2 fontSize='24px' />
            <AlertTitle ml='2'>Sua sessão expira em</AlertTitle>
            <AlertDescription>{duration}</AlertDescription>
        </Alert>
    )
}
