/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  ALL_LECTURES_FAIL,
  ALL_LECTURES_PROGRESS,
  ALL_LECTURES_SUCCESS,
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  LECTURE_STUDENTS_FAIL,
  LECTURE_STUDENTS_PROGRESS,
  LECTURE_STUDENTS_SUCCESS,
  RESET_LECTURES,
  RESET_LECTURE_STUDENTS,
  SELECT_LECTURES_FAIL,
  SELECT_LECTURES_PROGRESS,
  SELECT_LECTURES_SUCCESS,
  SET_IS_SELECTED_LECTURES,
} from '../actionTypes';

export const getLectures = () => async (dispatch) => {
  try {
    dispatch({ type: LECTURES_PROGRESS });
    const response = await ImHereApi.getLectures();

    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: LECTURES_FAIL });
      return;
    }

    dispatch({
      type: LECTURES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: LECTURES_FAIL });
  }
};

export const resetLectures = () => ({
  type: RESET_LECTURES,
});

export const getLectureStudents = (lectureCode) => async (dispatch) => {
  try {
    dispatch({ type: LECTURE_STUDENTS_PROGRESS });

    const response = await ImHereApi.getLectureStudents(lectureCode);

    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: LECTURE_STUDENTS_FAIL });
      return;
    }

    dispatch({
      type: LECTURE_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: LECTURE_STUDENTS_FAIL });
  }
};

export const resetLectureStudents = () => ({
  type: RESET_LECTURE_STUDENTS,
});

export const getAllLectures = () => async (dispatch) => {
  dispatch({ type: ALL_LECTURES_PROGRESS });
  try {
    const response = await ImHereApi.getAllLectures();
    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: ALL_LECTURES_FAIL });
      return;
    }

    dispatch({
      type: ALL_LECTURES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: ALL_LECTURES_FAIL });
  }
};

export const selectLectures = (lectureCodes) => async (dispatch) => {
  dispatch({ type: SELECT_LECTURES_PROGRESS });
  try {
    const response = await ImHereApi.selectLectures(lectureCodes);
    if (!response.success) {
      Alert.alert('', response.errorMessage);
      dispatch({ type: SELECT_LECTURES_FAIL });
      return;
    }

    Alert.alert('', 'Successfully registered to lectures!');
    dispatch({ type: SELECT_LECTURES_SUCCESS });
    dispatch({ type: SET_IS_SELECTED_LECTURES });
  } catch {
    dispatch({ type: SELECT_LECTURES_FAIL });
  }
};
