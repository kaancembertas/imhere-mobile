import {
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  LECTURE_DETAIL_PROGRESS,
  RESET_LECTURES,
  RESET_ATTENDENCE,
  ATTENDENCE_SUCCESS,
  ATTENDENCE_FAIL,
} from '../actionTypes';

const INITIAL_STATE = {
  lecturesProgress: true,
  attendenceProgress: true,
  lectures: [],
  attendence: [],
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

  if (type === RESET_ATTENDENCE) {
    return {
      ...state,
      attendence: [],
      attendenceProgress: true,
    };
  }

  if (type === LECTURE_DETAIL_PROGRESS) {
    return {
      ...state,
      attendenceProgress: true,
    };
  }

  if (type === ATTENDENCE_FAIL) {
    return {
      ...state,
      attendenceProgress: false,
    };
  }

  if (type === ATTENDENCE_SUCCESS) {
    return {
      ...state,
      attendenceProgress: false,
      attendence: payload,
    };
  }
  return state;
};
