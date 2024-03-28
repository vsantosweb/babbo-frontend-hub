import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
    HStack,
} from '@chakra-ui/react'

import { FaRegEye, FaEyeSlash } from "react-icons/fa";

import Layout from '@/layouts'
import AddressForm from '../forms/address-form';
import EventInfoForm from '../forms/event-info-form';
import { EventImageUpload, GoogleAutoComplete } from '@/components';

export default function EventForm() {
    return (
        <Layout name='manager'>
            <Form1 />
        </Layout>

    )
}


const Form1 = () => {

    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    return (
        <Flex maxWidth={'1000px'} m={'auto'} gap={4} width={'100%'}>
            <Stack spacing={4}>
                <EventImageUpload />

            </Stack>
            <Stack flex={1} spacing={6}>

                <Stack spacing={4}>
                    <Heading size={'md'}>Endereço</Heading>
                    <AddressForm />
                </Stack>
                <hr />
                <Stack spacing={4}>
                    <Heading size={'md'}>Informações do evento</Heading>
                    <EventInfoForm />
                </Stack>
                <HStack justifyContent={'flex-end'}>
                    <Button variant={'outline'}>visualizar</Button>
                    <Button>Criar evento</Button>
                </HStack>
            </Stack>
        </Flex>
    )
}
