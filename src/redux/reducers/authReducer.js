import {
  AUTH_PROGRESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_IS_AUTHENTICATED,
} from '../actionTypes';

const INITIAL_STATE = {
  authProgress: false,
  isAuthenticated: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  if (type === AUTH_PROGRESS) {
    return {
      ...state,
      authProgress: true,
    };
  }

  if (type === AUTH_FAIL) {
    return {
      ...state,
      authProgress: false,
    };
  }

  if (type === AUTH_SUCCESS) {
    return {
      ...state,
      authProgress: false,
      isAuthenticated: true,
    };
  }

  if (type === SET_IS_AUTHENTICATED) {
    return {
      ...state,
      isAuthenticated: payload,
    };
  }
  return state;
};
