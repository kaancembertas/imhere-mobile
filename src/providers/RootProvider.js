import React, { useEffect } from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ThemeProvider from './ThemeProvider';
import AuthenticationProvider from './AuthenticationProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

const RootProvider = ({ children }) => {
  //TODO: Change here
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthenticationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthenticationProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootProvider;
