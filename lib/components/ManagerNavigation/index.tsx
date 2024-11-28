'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { Logo } from '../Logo'
import { FaTicket } from 'react-icons/fa6'
import { IoMdExit } from "react-icons/io";
import { useAuth, useNavigation, useOrganizer } from '@/hooks'
import { useRouter } from 'next/router'
import container from '@/container'
import { AuthRepositoryInterface } from '@/interfaces'
import { IoLogOutOutline, IoPersonOutline, IoTicketOutline } from "react-icons/io5";

interface Props {
  children: React.ReactNode
}

const Links = ['Home']

const NavLink = (props: Props) => {
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'/'}>
      {children}
    </Box>
  )
}

export function ManagerNavigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useNavigation();

  const { user, logout } = useAuth();
  const { checkCustomerIsOrganizer } = useOrganizer();

  return (
    <Box borderBottomWidth={'1px'}>
      <Box px={3}>
        <Flex h={16} pl={isOpen ? '3rem': 0} alignItems={'center'} justifyContent={{ base: 'space-between', md: 'flex-end' }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize='6' />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            variant='ghost'
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex gap='4' alignItems={'center'}>

            {/* <Button variant='ghost' onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button> */}
            <Button
              as={Link}
              onClick={(e) => {
                e.preventDefault()
                checkCustomerIsOrganizer(user?.is_organizer)
              }}
              variant='ghost'
              size={{ base: 'sm' }}
              href={'/events/create'}
              leftIcon={<AddIcon />}>
              Criar evento
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                <Avatar
                  name={user?.name}
                  src={user?.photo_profile}
                />
              </MenuButton>
              <MenuList color={'#000'}>
                <MenuItem as={Link} href={'/account/profile'} icon={<IoPersonOutline />}>Minha conta</MenuItem>
                <MenuDivider m={0} />
                <MenuItem onClick={logout} icon={<IoLogOutOutline />}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}