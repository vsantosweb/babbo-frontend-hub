import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';
import { Footer, Navigation } from '@/components';
import { theme } from '@/themes/default';

export default function ClientLayout({
  children,
  title,
}: {
  children?: JSX.Element[] | JSX.Element;
  title: string;
}) {
  return (
    <div style={{
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      height: 'auto',
      minHeight: '100%',
    }}>
      {/* <Header /> */}
      <Navigation />
      <div style={{ flex: 1, height: 'auto', width: '100%', maxWidth: theme.defaultContainer.width, margin: '0 auto', padding: '0 1em' }}>
        {children}
      </div>
      <Footer />
      {/* <footer style={{background: 'green', position: 'relative', bottom: '0'}}>footer</footer> */}
    </div>
  );
}
