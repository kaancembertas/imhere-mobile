import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  USER_REGISTER_PROGRESS,
  USER_REGISTER_COMPLETE,
  RESET_USER_INFO,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_PROGRESS,
} from '../actionTypes';

export const register = (registerBody, onSuccess) => async (dispatch) => {
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

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_INFO_PROGRESS,
    });
    const response = await ImHereApi.getUserInfo();
    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({
        type: USER_INFO_FAIL,
      });
      return;
    }

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: USER_INFO_FAIL,
    });
  }
};

export const resetUserInfo = {
  type: RESET_USER_INFO,
};

export const setIsSelectedLectures = () => ({
  type: SET_IS_SELECTED_LECTURES,
});
