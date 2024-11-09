import React, { ElementType, MouseEventHandler, ReactElement, ReactNode, useEffect } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton
} from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";

export type MenuActionType = {
    // icon: ElementType
    icon: ElementType
    label: string | ReactNode
    action: MouseEventHandler
    disabled?: boolean
}

export type MenuActionProps = {

    options: Array<MenuActionType>
    onSelect: () => void
}

export const MenuAction: React.FC<MenuActionProps> = ({ options, onSelect }) => {

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<SlOptionsVertical />}
                variant='ghost'
                onClick={e => [e.stopPropagation(), onSelect()]}
            />
            <MenuList
                boxShadow='lg'
                transition="none"
                transitionDuration="0ms"
                transitionTimingFunction="none"
                transform={'none !important'}
                opacity={'1 !important'}
                p='2'
            >
                {options.map((option, index) => (
                    <MenuItem isDisabled={option.disabled} key={index} onClick={option.action} icon={<option.icon />}>
                        {option.label}
                    </MenuItem>
                )
                )}
            </MenuList>
        </Menu>
    )
}