import React from 'react';

import ClientLayout from './ClientLayout';
import AuthLayout from './AuthLayout';
import ManagerLayout from './ManagerLayout';
import AdminLayout from './AdminLayout';

const layouts = {
  client: ClientLayout,
  auth: AuthLayout,
  manager: ManagerLayout,
  admin: AdminLayout
};

export type layout = 'client' | 'auth' | 'manager' | 'admin';

export interface LayoutProps {
  name: layout;
  children?: JSX.Element | JSX.Element[] | undefined;
  title?: string;
  description?: string
  image?: string,
  keywords?: string
}

const Layout = ({ children, name, title, description, image, keywords }: LayoutProps) => {
  const Component = layouts[name];
  return <Component title={title} description={description || ''} image={image} keywords={keywords}>{children}</Component>;
};

export default Layout;


