import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, ManagerNavigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, IconButton, Box, Tooltip, Button } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { FaArrowLeft } from 'react-icons/fa';
import SidebarEvent from '@/components/SidebarEvent';
import Sidebar from '@/components/Sidebar';
import { useEvent } from '@/hooks';
import NavigationProvider from '@/hooks/useNavigation';

export default function ManagerLayout({
  children,
  title,
  description,
  image,
  keywords,
}: {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {

  const { event } = useEvent();
  const router = useRouter();

  return (
    <Styled.DefaultWrapper>

      <NavigationProvider>
        <Box
          position={{ base: 'fixed', sm: 'relative' }}
          display='flex' zIndex={1}
          height={'auto'}
          flex={1}
          minHeight='100%'
          shadow={{ base: 'lg', md: 'none' }}>
          <Sidebar />
          {event && <SidebarEvent />}
        </Box>

        <Styled.DefaultContainer>
          <ManagerNavigation />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: 'auto',
              // width: '1170px',
              width: '100%',
              padding: '0 1em',
              margin: 'auto'
            }}
          >
            {/* {
                router.pathname !== '/' && <Flex mb={8} alignItems={'center'}>
                  <IconButton onClick={() => router.back()} variant={'link'} icon={<FaArrowLeft />} aria-label='back-page' />
                  Voltar
                </Flex>
              } */}
            {children}
          </div>
          <Footer />
        </Styled.DefaultContainer>
      </NavigationProvider>

    </Styled.DefaultWrapper>
  );
}
