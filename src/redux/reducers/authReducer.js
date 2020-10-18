import {
  AUTHENTICATE_PROGRESS,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
} from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  authenticateProgress: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  if (type === AUTHENTICATE_PROGRESS) {
    return {
      ...state,
      authenticateProgress: true,
    };
  }

  if (type === AUTHENTICATE_FAIL) {
    return {
      ...state,
      authenticateProgress: false,
    };
  }

  return state;
};
