import {
  USER_REGISTER_PROGRESS,
  USER_REGISTER_COMPLETE,
  USER_INFO_COMPLETE,
  RESET_USER_INFO,
} from '../actionTypes';
const INITIAL_STATE = {
  registerProgress: false,
  info: {
    id: null,
    no: '',
    email: '',
    name: '',
    surname: '',
    role: null, // 0: Student - 1: Instructor
    image_url: '',
  },
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

  if (type === USER_INFO_COMPLETE) {
    return {
      ...state,
      info: payload,
    };
  }

  if (type === RESET_USER_INFO) {
    return INITIAL_STATE;
  }
  return state;
};
