import { Alert } from 'react-native';
import ImHereApi from '../../api/ImHereApi';
import {
  AUTH_PROGRESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  RESET_USER_INFO,
  LOGOUT,
  RESET_LECTURES,
} from '../actionTypes';

export const authenticate = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_PROGRESS,
    });

    const response = await ImHereApi.authenticate({
      email,
      password,
    });

    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({
        type: AUTH_FAIL,
      });
      return;
    }

    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: RESET_USER_INFO });
  dispatch({ type: RESET_LECTURES });
  dispatch({ type: LOGOUT });
};
