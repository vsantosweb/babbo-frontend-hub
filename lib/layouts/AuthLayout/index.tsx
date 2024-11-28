import React from 'react'
import * as Styled from './styles';
import { Box, Heading, Link } from '@chakra-ui/react';
import { Logo } from '@/components';
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

export default function AuthLayout({
    children,
    title,
    description,
    image,
    keywords,
}: {
    children?: JSX.Element[] | JSX.Element;
    title?: string;
    description?: string;
    image?: string;
    keywords?: string;
}) {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            width={'100%'}>
            <Stack spacing={8} width={'100%'} maxWidth={'380px'}>
                <Stack >
                    <Box width={'140px'}><Logo /></Box>
                </Stack>
                {children}
                <Box fontSize={'small'} textAlign={'center'}>
                {/* Ao fazer login ou criar uma conta, você concorda com nossos Termos e Condições e
                Declaração de Privacidade
                Todos os direitos reservados.
                Direitos autorais Babbo® */}
                </Box>
            </Stack>
        </Flex>
    )
}