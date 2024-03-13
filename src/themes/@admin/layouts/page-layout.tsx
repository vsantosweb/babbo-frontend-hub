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
    <Styled.DefaultWrapper>
      {/* <ServiceHeader /> */}
      <Styled.DefaultContainer>{children}</Styled.DefaultContainer>
      <footer
        style={{
          position: 'relative',
          bottom: '0',
          padding: '1em',
          textAlign: 'center',
        }}
      >
        <small>
          Todos os direitos reservados. Direitos autorais{' '}
          {new Date().getFullYear()} - redefrete.com.br®
        </small>
      </footer>
    </Styled.DefaultWrapper>
  );
}
