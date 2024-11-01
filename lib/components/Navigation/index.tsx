
import {
  Box,
  Flex,
  Collapse,
  useColorModeValue,
  useDisclosure,

} from '@chakra-ui/react';
import { NavigationDesktop } from './navigation-desktop';
import { useEffect, useState } from 'react';
import { NavigationMobile } from './navigation-mobile';
import { useAuth } from '@/hooks';
import { LoginModal } from '../LoginModal';

export function Navigation() {
  const { isOpen, onToggle } = useDisclosure();

  const { user } = useAuth();

  const [isMobile, setIsMobile] = useState<boolean | null>(); // Defina o estado inicial com base na largura da janela
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (window !== undefined) {
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

  if (loading) return <></>;

  return (
    <Box>
      <Flex
        bg={'white'}
        color={'gray.600'}
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
        borderColor={'gray.200'}
        align={'center'}
      >
        {isMobile ? <NavigationMobile /> : <NavigationDesktop user={user} />}

      </Flex>

      <Collapse in={isOpen} animateOpacity>
      </Collapse>
    </Box>
  );
}