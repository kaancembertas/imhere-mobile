import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  USER_REGISTER_PROGRESS,
  USER_REGISTER_COMPLETE,
  RESET_USER_INFO,
} from '../actionTypes';

export const register = (registerBody, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_PROGRESS,
      });

      const response = await ImHereApi.register(registerBody);
      if (!response.success) {
        Alert.alert('', response.errorMessage);
      } else {
        Alert.alert('', 'Successfully registered!');
        if (onSuccess) onSuccess();
      }
    } finally {
      dispatch({
        type: USER_REGISTER_COMPLETE,
      });
    }
  };
};

export const resetUserInfo = {
  type: RESET_USER_INFO,
};
