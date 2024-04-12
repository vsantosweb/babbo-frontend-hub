import React, { useEffect, useState } from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, Navigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation'

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

  const [urlAtual, setUrlAtual] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setUrlAtual(url);
    }
  }, []);


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
      <Head>
        <meta name="description" content={description?.substring(0, 50) + "..."} />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description?.substring(0, 50) + "..." } />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={urlAtual} />
        <meta property="og:site_name" content={'Babbo'} />
        <meta property="og:type" content="website" />
      </Head>
      {/* <Header /> */}
      <Navigation />
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
        {children}
      </div>
      <Footer />
    </div>
  );
}
