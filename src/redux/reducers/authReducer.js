import { LOGIN } from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  if (type === LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
    };
  }

  return state;
};
