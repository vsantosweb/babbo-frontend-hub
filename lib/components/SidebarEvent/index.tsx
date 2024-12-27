import React from 'react'
import {
    Box,
    useColorModeValue,
    BoxProps,
    Image,
    Flex,
    Heading,
    CloseButton,
    Text,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiSettings,
    FiUsers,
    FiCheckSquare,
    FiBarChart,
    FiPieChart,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { useEvent, useNavigation } from '@/hooks'
import { IoTicketOutline } from 'react-icons/io5'
import { NavItem } from './sidebar-menu-item'

interface LinkItemProps {
    name: string
    icon: IconType
}

export default function SidebarEvent() {
    const { isOpen, onOpen, onClose } = useNavigation();

    return window.innerWidth >= 768 ?
        <SidebarContent display={{ base: 'none', md: 'block' }} /> :
        isOpen && <SidebarContent />
}

interface LinkItemProps {
    name: string
    icon: IconType
    path: string
}

interface SidebarProps extends BoxProps { }

const SidebarContent = ({ ...rest }: SidebarProps) => {

    const { eventCustomer } = useEvent();
    const { onClose } = useNavigation();

    const event = eventCustomer;
    
    const LinkItems: Array<LinkItemProps> = [
        { name: 'Painel de controle', icon: FiPieChart, path: `/events/${event?.uuid}` },
        { name: 'Vendas', icon: FiTrendingUp, path: `/events/${event?.uuid}/sales` },
        { name: 'Ingressos', icon: IoTicketOutline, path: `/events/${event?.uuid}/tickets` },
        { name: 'Participantes', icon: FiUsers, path: `/events/${event?.uuid}/tickets` },
        { name: 'Check-In', icon: FiCheckSquare, path: `/events/${event?.uuid}/check-in` },
        { name: 'Configurações', icon: FiSettings, path: `/events/${event?.uuid}/settings` },
    ]

    return (
        <Box
            borderRightWidth='1px'
            p='2'
            maxWidth={'280px'}
            width={'280px'}
            height='auto'
            bg={useColorModeValue('gray.100', 'blackAlpha.500')}
            {...rest}>
            <Flex 
                mb='2' 
                gap='2' 
                p='2' 
                alignItems='center'
                cursor='pointer'
                borderRadius='lg'
                justifyContent='space-between'
                _hover={{ bg: useColorModeValue('gray.200', 'black.800') }}
            >
                <Box display='flex' gap='2' alignItems='center' >
                    <Box display={{ base: 'none', md: 'block' }} borderRadius={'10px'} flex='1' overflow={'hidden'}>
                        <Image
                            objectFit={'cover'}
                            src={`${event?.event_image}-md.jpg`}
                            boxSize="50px"
                        />
                    </Box>
                    <Box maxWidth="180px" width='100%'>
                        <Heading isTruncated fontWeight='bold' size='sm'>{event?.name}</Heading>
                        <Text isTruncated fontSize='12'>{event?.full_address}</Text>
                    </Box>
                </Box>
                <CloseButton flex='1' justifyContent='flex-end' display={{ base: 'flex', md: 'none' }} onClick={(e) => {
                    onClose && onClose()
                    e.preventDefault()
                }} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}