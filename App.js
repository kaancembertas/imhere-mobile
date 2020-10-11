import React from 'react';
import RootProvider from './src/providers/RootProvider';
import Router from './src/Router';
import { enableScreens } from 'react-native-screens';
enableScreens();

const App = () => {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
};

export default App;
