
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
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { NavigationDesktop } from './navigation-desktop';
import { useEffect, useState } from 'react';
import { NavigationMobile } from './navigation-mobile';

export function Navigation() {
  const { isOpen, onToggle } = useDisclosure();

  const [isMobile, setIsMobile] = useState<boolean | null>(); // Defina o estado inicial com base na largura da janela
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(window !== undefined){
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Atualize o estado com base na largura da janela ao redimensionar
      };
  
      window.addEventListener('resize', handleResize); // Adicione um event listener para redimensionamento da tela
  
      return () => {
        window.removeEventListener('resize', handleResize); // Remova o event listener ao desmontar o componente
        setLoading(false);
      };
    }
  }, [isMobile]); // Certifique-se de passar uma matriz vazia como segundo argumento para useEffect para garantir que este efeito seja executado apenas uma vez
  
  if(loading) return<></>;

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        position={'fixed'}
        zIndex={3}
        width={'100%'}
        boxShadow={'sm'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        // background={'#000'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        { isMobile ? <NavigationMobile /> : <NavigationDesktop />}

      </Flex>

      <Collapse in={isOpen} animateOpacity>
      </Collapse>
    </Box>
  );
}



interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
];
