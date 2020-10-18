import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  RESET_LECTURES,
} from '../actionTypes';

export const getLectures = () => {
  return async (dispatch) => {
    try {
      const response = await ImHereApi.getLectures();

      if (!response.success) {
        Alert.alert('', response.errorMessage);
        dispatch({
          type: LECTURES_FAIL,
        });
        return;
      }

      dispatch({
        type: LECTURES_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: LECTURES_FAIL,
      });
    }
  };
};

export const resetLectures = {
  type: RESET_LECTURES,
};
