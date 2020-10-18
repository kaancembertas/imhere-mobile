import imHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import { USER_REGISTER_PROGRESS, USER_REGISTER_COMPLETE } from '../actionTypes';

export const register = (registerBody, onSuccess) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_PROGRESS,
      });

      const response = await imHereApi.register(registerBody);
      if (!response.success) {
        Alert.alert('', response.errorMessage);
      } else {
        Alert.alert('', 'Successfully registered!');
        if (onSuccess) onSuccess();
      }
    } catch (e) {
    } finally {
      dispatch({
        type: USER_REGISTER_COMPLETE,
      });
    }
  };
};
