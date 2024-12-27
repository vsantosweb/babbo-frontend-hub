'use client'

import React from 'react'
import {
    Box,
    Flex,
    useColorModeValue,
    BoxProps,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { NavItemIcon, NavItem } from './sidebar-menu-item'
import { useNavigation } from '@/hooks'
import { CiCalendar } from 'react-icons/ci'
import { FaCalendar } from 'react-icons/fa'
import { IoCalendar } from 'react-icons/io5'

export interface LinkIconItemProps {
    name: string
    icon: IconType
    path: string
}
const LinkItems: Array<LinkIconItemProps> = [
    { name: 'Dashboard', icon: FiHome, path: '#' },
    { name: 'Eventos', icon: IoCalendar, path: '/' },
    { name: 'Pedidos', icon: FiTrendingUp, path: '#' },
    { name: 'Configurações', icon: FiSettings, path: '#' },
]

interface SidebarProps extends BoxProps {
    onClose?: () => void
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
    const { isOpen, onOpen } = useNavigation();

    return window.innerWidth >= 768 ?
        <SidebarContent  display={{ base: 'none', md: 'block' }} /> :
        isOpen && <SidebarContent />

}

export interface LinkIconItemProps {
    name: string
    icon: IconType
    path: string
}


interface SidebarProps extends BoxProps {}

const SidebarContent = ({ ...rest }: SidebarProps) => {
    return (
        <Box
            background={useColorModeValue('white', 'black.400')}
            borderRightWidth={'1px'}
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            {...rest}>
            <Flex height='64px' alignItems='center' mx='4' justifyContent='space-between'>
                <strong style={{ fontSize: '1.9rem' }}>B</strong>
            </Flex>
            <Box as='ul' display='flex' flexDirection='column' gap='2'>
                {LinkItems.map((item, index) => (
                    <NavItemIcon key={index} item={item} />
                ))}
            </Box>
        </Box>
    )
}

export default Sidebar;