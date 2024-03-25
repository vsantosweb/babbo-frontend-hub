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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {<meta property="og:title" content={title} />}
        {<meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.asPath} />
        <meta name="twitter:card" content="summary_large_image" />
        {<meta name="twitter:title" content={title} />}
        {<meta name="twitter:description" content={description} />}
        {<meta name="twitter:image" content={image} />}
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
          maxWidth: theme.defaultContainer.width,
          margin: '0 auto',
          padding: '0 1em',
        }}
      >
        {children}
      </div>
      <Footer />
      {/* <footer style={{background: 'green', position: 'relative', bottom: '0'}}>footer</footer> */}
    </div>
  );
}
