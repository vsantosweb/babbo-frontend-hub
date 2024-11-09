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
import SidebarMenuEvent from './sidebar-menu-event'
import { EventInterface } from '@/repository/Types/EventType'

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
    onClose: () => void
}


export default function SidebarEvent() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box minH='100%' height='auto'
             bg={useColorModeValue('gray.100', 'blackAlpha.500')}
        >
            <SidebarMenuEvent  onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >

                <DrawerContent>
                    {/* <SidebarMenu onClose={onClose} /> */}
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                {/* Content */}
            </Box>
        </Box>
    )
}




interface MobileProps extends FlexProps {
    onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height='20'
            alignItems='center'
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent='flex-start'
            {...rest}>
            <IconButton
                variant='outline'
                onClick={onOpen}
                aria-label='open menu'
                icon={<FiMenu />}
            />

            <Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
                Logo
            </Text>
        </Flex>
    )
}