

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { CiLocationOn } from 'react-icons/ci';

export function AvaiableCitiesDesktop() {
    return (
        <Menu >
            <MenuButton p={0} as={Button} variant={'muted'} rightIcon={<ChevronDownIcon />}> São Paulo, SP </MenuButton>
            <MenuList transition="all ease" as={'div'} scale={1} opacity={1}>
                <MenuItem icon={<CiLocationOn />}>Rio de Janeiro, RJ</MenuItem>
                <MenuItem icon={<CiLocationOn />}>Santa Catarina, SC</MenuItem>
            </MenuList>
        </Menu>
    )
}
