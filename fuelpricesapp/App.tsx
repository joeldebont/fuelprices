/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Map from './components/screens/map';

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
      <Map />
  </QueryClientProvider>
  );
}

export default App;
