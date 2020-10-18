import AsyncStorage from '@react-native-community/async-storage';

export const storageTypes = {
  VALUE: 'VALUE',
  JSON: 'JSON',
};

export const storageKeys = {
  THEME_ID: '@THEME_ID',
  TEST_KEY: '@TEST_KEY',
  ACCESS_TOKEN: '@ACCESS_TOKEN',
};

const convertForStore = (value, type) => {
  if (type === storageTypes.VALUE) return value;
  else if (type === storageTypes.JSON) return JSON.stringify(value);
  else throw new Error('Storage type can be VALUE or JSON');
};

export const storeData = async (key, type, value) => {
  const data = convertForStore(value, type);
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    throw new Error('asyncStorage storeData error');
  }
};

export const getData = async (key, type) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    if (type === storageTypes.JSON) return JSON.parse(value);
    else if (type === storageTypes.VALUE) return value;
    else throw new Error('Storage type can be VALUE or JSON');
  } catch (e) {
    throw new Error('asyncStorage getData error');
  }
};
