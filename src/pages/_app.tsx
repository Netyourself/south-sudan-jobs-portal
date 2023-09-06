import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { UsersProvider } from '@/contexts/userContext';
import { JobsProvider } from '@/contexts/jobsContext';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <JobsProvider>
        <UsersProvider>
          <Component {...pageProps} />
        </UsersProvider>
      </JobsProvider>
    </ChakraProvider>
  );
};

export default App;
