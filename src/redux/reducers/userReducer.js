import { USER_REGISTER_PROGRESS, USER_REGISTER_COMPLETE } from '../actionTypes';
const INITIAL_STATE = {
  role: null, // 0: Student - 1: Instructor
  registerProgress: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  if (type === USER_REGISTER_PROGRESS) {
    return {
      ...state,
      registerProgress: true,
    };
  }

  if (type === USER_REGISTER_COMPLETE) {
    return {
      ...state,
      registerProgress: false,
    };
  }
  return state;
};
