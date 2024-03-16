import React from 'react';

import ClientLayout from './ClientLayout';

const layouts = {
  client: ClientLayout,
};

export type layout = 'client';

export interface LayoutProps {
  name: layout;
  children?: JSX.Element | JSX.Element[];
  title: string;
}

const Layout = ({ children, name, title }: LayoutProps) => {
  const Component = layouts[name];
  return <Component title={title}>{children}</Component>;
};

export default Layout;
