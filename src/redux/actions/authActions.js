import { Alert } from 'react-native';
import ImHereApi from '../../api/ImHereApi';
import { storageKeys, storageTypes, storeData } from '../../utils/asyncStorage';
import {
  AUTH_PROGRESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_INFO_COMPLETE,
} from '../actionTypes';

export const authenticate = (email, password) => {
  return async (dispatch) => {
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

      const accessToken = response.data.token;
      console.log('login resss', response);
      await storeData(
        storageKeys.ACCESS_TOKEN,
        storageTypes.VALUE,
        accessToken,
      );

      const userInfoResponse = await ImHereApi.getUserInfo();
      if (!userInfoResponse.success) {
        Alert.alert('', userInfoResponse.errorMessage);
        dispatch({
          type: AUTH_FAIL,
        });
        return;
      }

      dispatch({
        type: USER_INFO_COMPLETE,
        payload: userInfoResponse.data,
      });

      dispatch({
        type: AUTH_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  };
};
