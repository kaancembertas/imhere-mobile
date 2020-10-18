import {
  LECTURES_FAIL,
  LECTURES_PROGRESS,
  LECTURES_SUCCESS,
  RESET_LECTURES,
} from '../actionTypes';

const INITIAL_STATE = {
  lecturesProgress: true,
  lectures: [],
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
  return state;
};