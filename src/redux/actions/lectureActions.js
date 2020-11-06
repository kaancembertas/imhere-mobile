import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  LECTURE_STUDENTS_FAIL,
  LECTURE_STUDENTS_PROGRESS,
  LECTURE_STUDENTS_SUCCESS,
  RESET_LECTURES,
  RESET_LECTURE_STUDENTS,
} from '../actionTypes';

export const getLectures = () => {
  return async (dispatch) => {
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
};

export const resetLectures = () => ({
  type: RESET_LECTURES,
});

export const getLectureStudents = (lectureCode) => {
  return async (dispatch) => {
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
};

export const resetLectureStudents = () => ({
  type: RESET_LECTURE_STUDENTS,
});
