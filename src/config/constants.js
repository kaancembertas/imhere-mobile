import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screen = {
  width,
  height,
};

const API_CONSTANTS = {
  USER: {
    STUDENT: 0,
    INSTRUCTOR: 1,
  },
};

export { screen, API_CONSTANTS };
