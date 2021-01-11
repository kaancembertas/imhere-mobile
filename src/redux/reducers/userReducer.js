/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import {
  USER_REGISTER_PROGRESS,
  USER_REGISTER_COMPLETE,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_PROGRESS,
  RESET_USER_INFO,
  SET_IS_SELECTED_LECTURES,
} from '../actionTypes';
const INITIAL_STATE = {
  registerProgress: false,
  userInfoProgress: false,
  userInfoSuccess: false,
  info: {
    id: null,
    no: '',
    email: '',
    name: '',
    surname: '',
    role: null, // 0: Student - 1: Instructor
    image_url: '',
    isSelectedLecture: null,
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

  if (type === USER_INFO_PROGRESS) {
    return {
      ...state,
      userInfoProgress: true,
    };
  }

  if (type === USER_INFO_SUCCESS) {
    return {
      ...state,
      userInfoSuccess: true,
      userInfoProgress: false,
      info: payload,
    };
  }

  if (type === USER_INFO_FAIL) {
    return {
      ...state,
      userInfoSuccess: false,
      userInfoProgress: false,
    };
  }

  if (type === RESET_USER_INFO) {
    return INITIAL_STATE;
  }

  if (type === SET_IS_SELECTED_LECTURES) {
    return {
      ...state,
      info: {
        ...state.info,
        isSelectedLecture: true,
      },
    };
  }
  return state;
};
