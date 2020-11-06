import {
  RESET_ATTENDENCE,
  ATTENDENCE_SUCCESS,
  ATTENDENCE_FAIL,
} from '../actionTypes';

const INITIAL_STATE = {
  attendenceProgress: true,
  attendence: [],
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  if (type === RESET_ATTENDENCE) {
    return {
      ...state,
      attendence: [],
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
