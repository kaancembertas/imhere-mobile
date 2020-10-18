import { Alert } from 'react-native';
import ImHereApi from '../../api/ImHereApi';
import { storageKeys, storageTypes, storeData } from '../../utils/asyncStorage';
import {
  AUTHENTICATE_PROGRESS,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  USER_INFO_COMPLETE,
} from '../actionTypes';

export const authenticate = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTHENTICATE_PROGRESS,
      });

      const response = await ImHereApi.authenticate({
        email,
        password,
      });

      if (!response.success) {
        Alert.alert('', response.errorMessage);
        dispatch({
          type: AUTHENTICATE_FAIL,
        });
        return;
      }

      const accessToken = response.data.token;
      await storeData(
        storageKeys.ACCESS_TOKEN,
        storageTypes.VALUE,
        accessToken,
      );

      const userInfoResponse = await ImHereApi.getUserInfo();
      if (!userInfoResponse.success) {
        Alert.alert('', userInfoResponse.errorMessage);
        dispatch({
          type: AUTHENTICATE_FAIL,
        });
        return;
      }

      dispatch({
        type: USER_INFO_COMPLETE,
        payload: userInfoResponse,
      });

      dispatch({
        type: AUTHENTICATE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: AUTHENTICATE_FAIL,
      });
    }
  };
};
