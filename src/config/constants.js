import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screen = {
  width,
  height,
};

export { screen };
