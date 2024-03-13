import React from 'react';

// import { ServiceHeader } from '@/components';
import * as Styled from './styles';

export default function ClientLayout({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) {
  return (
    <div style={{ display: 'flex',position: 'relative', flexDirection: 'column', height: 'auto', minHeight: '100%', padding: '2em 1em' }}>
           {/* <Header /> */}
            <div style={{height: 'auto', }}>
                {children}
            </div>
            {/* <footer style={{background: 'green', position: 'relative', bottom: '0'}}>footer</footer> */}
        </div>
  );
}
