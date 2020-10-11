import React, { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import themes from '../config/themes';
import {
  getData,
  storeData,
  storageKeys,
  storageTypes,
} from '../utils/asyncStorage';

const ThemeContext = createContext({
  theme: themes[0],
  changeTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);
  const keys = {
    light: 'LIGHT',
    dark: 'DARK',
  };

  useEffect(() => {
    initTheme();
  }, []);

  const initTheme = async () => {
    const key = await getData(storageKeys.THEME_ID, storageTypes.VALUE);
    if (key === keys.dark) setTheme(themes[1]);
    else setTheme(themes[0]);
  };

  const changeTheme = async () => {
    try {
      if (theme.key === keys.dark) {
        await storeData(storageKeys.THEME_ID, storageTypes.VALUE, keys.light);
        setTheme(themes[0]);
      } else {
        await storeData(storageKeys.THEME_ID, storageTypes.VALUE, keys.dark);
        setTheme(themes[1]);
      }
    } catch (e) {
      console.log('Change theme error', e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}>
      <StatusBar
        backgroundColor={theme.primaryThemeColor}
        barStyle={theme.key === keys.light ? 'dark-content' : 'light-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context could not be found');
  }
  return context;
};

export default ThemeProvider;
