import { AUTH_PROGRESS, AUTH_SUCCESS, AUTH_FAIL } from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  authProgress: false,
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
      isAuthenticated: true,
      authProgress: false,
    };
  }

  return state;
};
