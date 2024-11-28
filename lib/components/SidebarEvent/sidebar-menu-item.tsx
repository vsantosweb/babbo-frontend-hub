'use client'

import React, { ReactNode } from 'react'
import {
    Box,
    Flex,
    Icon,
    useColorModeValue,
    FlexProps,
} from '@chakra-ui/react'

import { IconType } from 'react-icons'

import Link from 'next/link'

interface NavItemProps extends FlexProps {
    icon: IconType
    children: JSX.Element | string
    path?: string
}

export const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
    return (
        <Box
            as={Link}
            href={path}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                alignItems='center'
                borderRadius='lg'
                p='2'
                cursor='pointer'
                _hover={{
                    bg: useColorModeValue('primary.50', 'black.900'),
                    color: useColorModeValue('gra.800', 'primary.200'),
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr='4'
                        fontSize='16'
                        _groupHover={{
                            color: 'primary.500',
                        }}
                        as={icon}
                    />
                )}
                {children && children}
            </Flex>
        </Box>
    )
}


