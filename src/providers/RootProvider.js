import React from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ThemeProvider from './ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootProvider;
