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
import { useAuth, useOrganizer } from '@/hooks'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();

  const { user, logout } = useAuth();
  const { checkCustomerIsOrganizer } = useOrganizer();

  return (
    <Box borderBottomWidth={'1px'}>
      <Box px={3}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            {/* <Box width={'120px'}><Logo /></Box> */}
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex gap='4' alignItems={'center'}>

            <Button variant='ghost' onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            <Button
              as={Link}
              onClick={(e) => {
                e.preventDefault()
                checkCustomerIsOrganizer(user?.is_organizer)
              }}
              href={'/events/create'}
              mr={4}
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
                {/* <MenuItem icon={<IoTicketOutline />}>Meus ingressos</MenuItem> */}
                <MenuDivider m={0} />
                <MenuItem onClick={logout} icon={<IoLogOutOutline />}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </Box>
  )
}