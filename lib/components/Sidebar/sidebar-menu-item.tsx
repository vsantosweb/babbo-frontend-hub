'use client'

import React, { ReactNode } from 'react'
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    useColorMode,
    Tooltip,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { LinkIconItemProps, Logo } from '@/components'
import Link from 'next/link'

interface LinkItemProps {
    name: string
    icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FiHome },
    { name: 'Pedidos', icon: FiTrendingUp },
    { name: 'Eventos', icon: FiCompass },
    { name: 'Configurações', icon: FiSettings },
]

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
                align='center'
                p='2'
                mx='2'
                borderRadius='lg'
                role='group'
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

interface NavItemIconProps extends FlexProps {
    icon: IconType
    path?: string
}

export const NavItemIcon = ({ item, ...rest }: { item: LinkIconItemProps }) => {
    return (
        <Box
            as={Link}
            href='#'
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Tooltip hasArrow label={item.name} placement='right-start' aria-label={item.name}>
                <Flex
                    align='center'
                    justifyContent={'center'}
                    p='2'
                    mx='2'
                    borderRadius='lg'
                    flexDirection='column'
                    role='group'
                    cursor='pointer'
                    _hover={{ bg: 'primary.50', color: 'primary.500', }}
                    {...rest}
                >
                    <Icon
                        fontSize='20'
                        _groupHover={{
                            color: 'primary.500',
                        }}
                        as={item.icon}
                    />
                    {/* <small style={{fontSize:'9px'}}>{item.name}</small> */}
                </Flex>
            </Tooltip>


        </Box>
    )
}

