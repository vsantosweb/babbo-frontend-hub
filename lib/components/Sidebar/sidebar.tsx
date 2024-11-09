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
    Button,
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
import { Logo } from '@/components'
import { NavItemReduced, NavItem } from './sidebar-menu-item'

interface LinkItemProps {
    name: string
    icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FiHome },
    { name: 'Pedidos', icon: FiTrendingUp },
    { name: 'Eventos', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Configurações', icon: FiSettings },
]

interface SidebarProps extends BoxProps {
    onClose?: () => void
}


const Sidebar = ({ onClose, ...rest }: SidebarProps) => {


    return (
        <Box
            borderRightWidth={'1px'}
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            {...rest}>
            
            <Flex height='60px' alignItems='center' mx='4' justifyContent='space-between'>
                <Logo width='40px' />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItemReduced key={link.name} icon={link.icon}>
                    {link.name}
                </NavItemReduced>
            ))}
        </Box>
    )
}

export default Sidebar;