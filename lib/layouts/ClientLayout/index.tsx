import React, { useEffect, useState } from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, Navigation } from '@/components';
import { theme } from '@/themes/default';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/hooks';

type LayoutProps = {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;

}
export default function ClientLayout({ ...rest }: LayoutProps) {

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
      {
        rest && <Head>
          <title>{rest.title}</title>
          <meta property="og:title" content={rest.title} />
          <meta property="og:description" content={rest.description?.substring(0, 50).replace(/<[^>]*>/g, '') + "..."} />
          <meta property="og:image" content={rest.image || '/icon.png'} />
          <meta property="og:url" content={urlAtual} />
          <meta property="og:site_name" content={'babbo.social'} />

          {/* <meta property="og:type" content="website" /> */}
          <meta property="og:type" content="article" />
          {/* <meta property="og:type" content="book"/> */}
          {/* <meta property="og:type" content="article"/> */}
          {/* <meta property="og:type" content="profile"/> */}
        </Head>
      }
      {/* <Header /> */}
      <Navigation />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: '62px',
          height: 'auto',
          width: '100%',
          // maxWidth: theme.defaultContainer.width,
          margin: '0 auto',
          paddingLeft: '1em',
          paddingRight: '1em',
          paddingBottom: '2.6rem'
        }}
      >
        {rest.children}
      </div>
      <Footer />
    </div>
  );
}
