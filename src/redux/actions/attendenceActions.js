import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  RESET_ATTENDENCE,
  ATTENDENCE_FAIL,
  ATTENDENCE_SUCCESS,
  ATTENDENCE_PROGRESS,
  USER_ATTENDENCE_PROGRESS,
  USER_ATTENDENCE_FAIL,
  USER_ATTENDENCE_SUCCESS,
  RESET_USER_ATTENDENCE,
} from '../actionTypes';

export const getAttendence = (lectureCode) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ATTENDENCE_PROGRESS,
      });
      const response = await ImHereApi.getAttendence(lectureCode);
      if (!response.success) {
        Alert.alert('', response.errorMessage);
        dispatch({
          type: ATTENDENCE_FAIL,
        });
        return;
      }

      dispatch({
        type: ATTENDENCE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ATTENDENCE_FAIL,
      });
    }
  };
};

export const getAttendenceByUser = (lectureCode, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_ATTENDENCE_PROGRESS,
      });
      const response = await ImHereApi.getAttendenceByUser(lectureCode, userId);
      if (!response.success) {
        Alert.alert('', response.errorMessage);
        dispatch({
          type: USER_ATTENDENCE_FAIL,
        });
        return;
      }

      dispatch({
        type: USER_ATTENDENCE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ATTENDENCE_FAIL,
      });
    }
  };
};

export const resetAttendence = () => ({
  type: RESET_ATTENDENCE,
});

export const resetUserAttendence = () => ({
  type: RESET_USER_ATTENDENCE,
});
