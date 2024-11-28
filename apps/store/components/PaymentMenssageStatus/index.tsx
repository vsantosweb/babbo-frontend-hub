import React from 'react'
import {
    Alert,
    AlertTitle,
    AlertDescription,
    AlertIcon,
    Button,
    AlertStatus,
    LinkBox,
    HStack,
    Stack,
} from '@chakra-ui/react'
import { CiGift } from 'react-icons/ci'
import { FaTicketAlt } from 'react-icons/fa'
import { IoTicketOutline } from "react-icons/io5";
import Link from 'next/link';

export default function PaymentMenssageStatus({ status }: { status: AlertStatus }) {
    return (
        <Alert
            status={status}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='100%'
            background={'none'}
            flex='1'
            gap='4'
        >
            <AlertIcon boxSize={{ base: '40px', md: '60px' }} mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='xl'>Pagamento efetuado com sucesso!</AlertTitle>
            <AlertDescription maxWidth='sm'>
                Seu pagamento está sendo processado e logo entraremos em contato
            </AlertDescription>
            <Stack w={{base: 'full', md: 'max-content'}} direction={{base: 'column', md: 'row'}}>
                <Button width={'100%'} as={Link} href='/'>Continuar navegando</Button>
                <Button width={'100%'} as={Link} href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/minhas-compras`} rightIcon={<IoTicketOutline fontSize='24px' />} variant={'outline'}>Minhas compras</Button>
            </Stack>
        </Alert>
    )
}
