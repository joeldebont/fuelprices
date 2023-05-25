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
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  </QueryClientProvider>
  );
}

export default App;
