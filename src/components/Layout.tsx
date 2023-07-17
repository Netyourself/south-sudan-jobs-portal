import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;
