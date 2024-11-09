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
    Image,
    Heading,
    Stack,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiCheckSquare 
} from 'react-icons/fi'
import { IoTicketOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { Logo } from '@/components'
import { NavItem } from './sidebar-menu-item'
import { useEvent } from '@/hooks'

interface LinkItemProps {
    name: string
    icon: IconType
    path: string
}


interface SidebarProps extends BoxProps {
    onClose: () => void
}


const SidebarMenuEvent = ({ onClose, ...rest }: SidebarProps) => {
    
    const { event } = useEvent()

    const LinkItems: Array<LinkItemProps> = [
        { name: 'Dashboard', icon: FiHome, path:  `/events/${event?.uuid}` },
        { name: 'Vendas', icon: FiTrendingUp, path: `/events/${event?.uuid}/sales` },
        { name: 'Ingressos', icon: IoTicketOutline, path: `/events/${event?.uuid}/tickets` },
        { name: 'Participantes', icon: FiUsers, path: `/events/${event?.uuid}/tickets` },
        { name: 'Check-In', icon: FiCheckSquare, path: `/events/${event?.uuid}/tickets` },
        { name: 'Configurações', icon: FiSettings, path: `/events/${event?.uuid}/settings` },
    ]

    return (
        <Box
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            p='2'
            {...rest}>
            <Flex py='4' mb='2' gap='2' height='60px' alignItems='center' justifyContent='space-between'
                p='4'
                borderRadius='lg'
                cursor='pointer'
                _hover={{bg: useColorModeValue('gray.200', 'black.800')}}
            >
                <Box borderRadius={'10px'} overflow={'hidden'}>
                    <Image
                        objectFit={'cover'}
                        src={`${event?.event_image}-md.jpg`}
                        boxSize="50px"
                    />

                </Box>
                <Box maxWidth="165px">
                    <Heading isTruncated fontWeight='bold' size='sm'>{event?.name}</Heading>
                    <Text isTruncated fontSize='12'>{event?.full_address}</Text>
                </Box>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

export default SidebarMenuEvent;