import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  RESET_LECTURES,
  RESET_ATTENDENCE,
  ATTENDENCE_FAIL,
  ATTENDENCE_SUCCESS,
} from '../actionTypes';

export const getLectures = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LECTURES_PROGRESS,
      });
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

export const getAttendence = (lectureCode) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ATTENDENCE_SUCCESS,
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

export const resetLectures = () => ({
  type: RESET_LECTURES,
});

export const resetAttendence = () => ({
  type: RESET_ATTENDENCE,
});
