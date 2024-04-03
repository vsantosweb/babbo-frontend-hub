import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, Navigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';

export default function ClientLayout({
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
      <Navigation />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: 'auto',
          width: '100%',
          maxWidth: theme.defaultContainer.width,
          margin: '0 auto',
          padding: '0 1em',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
