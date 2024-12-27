import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, ManagerNavigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, IconButton, Box, Tooltip, Button, Heading } from '@chakra-ui/react';
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
  actions
}: {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  actions?: JSX.Element[]
}) {

  const { eventCustomer } = useEvent();

  return (
    <Styled.DefaultWrapper>

      <NavigationProvider>
        <Box
          position={{ base: 'fixed', sm: 'relative' }}
          display='flex' zIndex={1}
          height={'auto'}
          width={'1300px'}
          flex={1}
          minHeight='100%'
          shadow={{ base: 'lg', md: 'none' }}>
          <Sidebar />
          {eventCustomer && <SidebarEvent />}
        </Box>

        <Styled.DefaultContainer>
          <ManagerNavigation pageTitle={title} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: 'auto',
              // width: '1170px',
              width: '1300px',
              padding: '0 1em',
              margin: 'auto'
            }}
          >
           
            {children}
          </div>
          <Footer />
        </Styled.DefaultContainer>
      </NavigationProvider>

    </Styled.DefaultWrapper>
  );
}
