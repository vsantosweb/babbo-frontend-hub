import React, { ReactNode } from 'react'
import {
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuItemProps,

} from '@chakra-ui/react'
import { useAuth } from '@/hooks'
import Link from 'next/link'
import { IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { LuUser2 } from 'react-icons/lu';

export default function ProfileMenu({ extraItems }: { extraItems?: ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <Menu placement='bottom-end' isLazy={false} >
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                <Avatar icon={<LuUser2 fontSize='1.5rem' />} />
            </MenuButton>
            <MenuList transition={'none'} color={'#000'}>
                <MenuItem as={Link} href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/minha-conta`} icon={<IoPersonOutline />}>Minha conta</MenuItem>
                {/* <MenuItem icon={<IoTicketOutline />}>Meus ingressos</MenuItem> */}
                {extraItems && extraItems}
                <MenuDivider m={0} />
                <MenuItem onClick={logout} icon={<IoLogOutOutline />}>Sair</MenuItem>
            </MenuList>
        </Menu>
    )
}
