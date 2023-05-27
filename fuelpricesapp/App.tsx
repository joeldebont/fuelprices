/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigation';
import { SessionProvider } from './src/contexts/sessionContext';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
          refetchOnWindowFocus: false
      }
  }
});

const App = () => {

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
