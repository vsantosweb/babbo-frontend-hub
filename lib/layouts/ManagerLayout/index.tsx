import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, ManagerNavigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { FaArrowLeft } from 'react-icons/fa';

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
  const router = useRouter();
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        height: 'auto',
        minHeight: '100%',
      }}
    >

      {/* <Header /> */}
      <ManagerNavigation />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: 'auto',
          width: '100%',
          // maxWidth: theme.defaultContainer.width,
          margin: '0 auto',
          padding: '0 1em',
        }}
      >
        {
          router.pathname !== '/' && <Flex alignItems={'center'}>
          <IconButton onClick={() => router.back()} variant={'link'} icon={<FaArrowLeft />} aria-label='back-page' />
          Voltar
        </Flex>
        }
        {children}
      </div>
      <Footer />
    </div>
  );
}
