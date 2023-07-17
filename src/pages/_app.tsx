import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
