/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import {
  ALL_LECTURES_FAIL,
  ALL_LECTURES_PROGRESS,
  ALL_LECTURES_SUCCESS,
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  LECTURE_DETAIL_PROGRESS,
  LECTURE_STUDENTS_FAIL,
  LECTURE_STUDENTS_PROGRESS,
  LECTURE_STUDENTS_SUCCESS,
  RESET_LECTURES,
  RESET_LECTURE_STUDENTS,
  SELECT_LECTURES_FAIL,
  SELECT_LECTURES_PROGRESS,
  SELECT_LECTURES_SUCCESS,
} from '../actionTypes';

const INITIAL_STATE = {
  lecturesProgress: true,
  lectures: [],

  getLectureStudentsProgress: true,
  lectureStudents: [],

  allLectures: [],
  allLecturesProgress: true,

  selectLecturesProgress: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  if (type === LECTURES_PROGRESS) {
    return {
      ...state,
      lecturesProgress: true,
    };
  }

  if (type === LECTURES_FAIL) {
    return {
      ...state,
      lecturesProgress: false,
    };
  }

  if (type === LECTURES_SUCCESS) {
    return {
      ...state,
      lecturesProgress: false,
      lectures: payload,
    };
  }
  if (type === RESET_LECTURES) {
    return INITIAL_STATE;
  }

  if (type === LECTURE_DETAIL_PROGRESS) {
    return {
      ...state,
      attendenceProgress: true,
    };
  }

  if (type === RESET_LECTURE_STUDENTS) {
    return {
      ...state,
      getLectureStudentsProgress: true,
      lectureStudents: [],
    };
  }

  if (type === LECTURE_STUDENTS_PROGRESS) {
    return {
      ...state,
      getLectureStudentsProgress: true,
    };
  }

  if (type === LECTURE_STUDENTS_SUCCESS) {
    return {
      ...state,
      getLectureStudentsProgress: false,
      lectureStudents: payload,
    };
  }

  if (type === LECTURE_STUDENTS_FAIL) {
    return {
      ...state,
      getLectureStudentsProgress: false,
      lectureStudents: [],
    };
  }

  if (type === ALL_LECTURES_PROGRESS) {
    return {
      ...state,
      allLecturesProgress: true,
    };
  }

  if (type === ALL_LECTURES_FAIL) {
    return {
      ...state,
      allLecturesProgress: false,
      allLectures: [],
    };
  }

  if (type === ALL_LECTURES_SUCCESS) {
    return {
      ...state,
      allLecturesProgress: false,
      allLectures: payload,
    };
  }

  if (type === SELECT_LECTURES_PROGRESS) {
    return {
      ...state,
      selectLecturesProgress: true,
    };
  }

  if (type === SELECT_LECTURES_SUCCESS) {
    return {
      ...state,
      selectLecturesProgress: false,
    };
  }

  if (type === SELECT_LECTURES_FAIL) {
    return {
      ...state,
      selectLecturesProgress: false,
    };
  }

  return state;
};
