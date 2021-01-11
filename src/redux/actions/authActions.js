/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import { Alert } from 'react-native';
import ImHereApi from '../../api/ImHereApi';
import {
  AUTH_PROGRESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  RESET_USER_INFO,
  LOGOUT,
  RESET_LECTURES,
  SET_IS_AUTHENTICATED,
} from '../actionTypes';

export const authenticate = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_PROGRESS });

    const response = await ImHereApi.authenticate({
      email,
      password,
    });

    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: AUTH_FAIL });
      return;
    }

    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const setIsAuthenticated = (value) => ({
  type: SET_IS_AUTHENTICATED,
  payload: value,
});

export const logout = () => ({ type: LOGOUT });
