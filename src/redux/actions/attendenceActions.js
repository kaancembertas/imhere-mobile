/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import ImHereApi from '../../api/ImHereApi';
import FaceRecognitionApi from '../../api/FaceRecognitionApi';
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
  ADD_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE_PROGRESS,
  ADD_ATTENDENCE_FAIL,
} from '../actionTypes';

export const getAttendence = (lectureCode) => async (dispatch) => {
  try {
    const response = await ImHereApi.getAttendence(lectureCode);
    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: ATTENDENCE_FAIL });
      return;
    }

    dispatch({
      type: ATTENDENCE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: ATTENDENCE_FAIL });
  }
};

export const getAttendenceByUser = (lectureCode, userId) => async (
  dispatch,
) => {
  try {
    dispatch({ type: USER_ATTENDENCE_PROGRESS });
    const response = await ImHereApi.getAttendenceByUser(lectureCode, userId);
    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: USER_ATTENDENCE_FAIL });
      return;
    }

    dispatch({
      type: USER_ATTENDENCE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: USER_ATTENDENCE_FAIL });
  }
};

export const addAttendence = (image, lectureCode, week) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ATTENDENCE_PROGRESS });
    const response = await FaceRecognitionApi.addAttendence(
      image,
      lectureCode,
      week,
    );

    if (!response.success) {
      dispatch({ type: ADD_ATTENDENCE_FAIL });
      Alert.alert('', response.errorMessage);
      return;
    }
    dispatch({ type: ADD_ATTENDENCE_SUCCESS });
    dispatch(getAttendence(lectureCode));
    Alert.alert('The attendence successfully processed!');
  } catch (err) {
    dispatch({ type: ADD_ATTENDENCE_FAIL });
  }
};

export const resetAttendence = () => ({
  type: RESET_ATTENDENCE,
});

export const resetUserAttendence = () => ({
  type: RESET_USER_ATTENDENCE,
});
