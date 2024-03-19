import React from 'react';

import ClientLayout from './ClientLayout';

const layouts = {
  client: ClientLayout,
};

export type layout = 'client';

export interface LayoutProps {
  name: layout;
  children?: JSX.Element | JSX.Element[];
  title?: string;
  description?: string
  image?: string,
  keywords?: string
}

const Layout = ({ children, name, title, description, image,keywords }: LayoutProps) => {
  const Component = layouts[name];
  return <Component title={title} description={description} image={image} keywords={keywords}>{children}</Component>;
};

export default Layout;
