/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import {
  RESET_ATTENDENCE,
  ATTENDENCE_SUCCESS,
  ATTENDENCE_FAIL,
  RESET_USER_ATTENDENCE,
  USER_ATTENDENCE_PROGRESS,
  USER_ATTENDENCE_SUCCESS,
  USER_ATTENDENCE_FAIL,
  ADD_ATTENDENCE_PROGRESS,
  ADD_ATTENDENCE_SUCCESS,
  ADD_ATTENDENCE_FAIL,
} from '../actionTypes';

const INITIAL_STATE = {
  attendenceProgress: true,
  attendence: [],
  userAttendenceProgress: true,
  userAttendence: [],
  addAttendenceProgress: false,
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

  if (type === RESET_USER_ATTENDENCE) {
    return {
      ...state,
      userAttendenceProgress: true,
      userAttendence: [],
    };
  }

  if (type === USER_ATTENDENCE_PROGRESS) {
    return {
      ...state,
      userAttendenceProgress: true,
      userAttendence: [],
    };
  }

  if (type === USER_ATTENDENCE_SUCCESS) {
    return {
      ...state,
      userAttendenceProgress: false,
      userAttendence: payload,
    };
  }

  if (type === USER_ATTENDENCE_FAIL) {
    return {
      ...state,
      userAttendenceProgress: false,
      userAttendence: [],
    };
  }

  if (type === ADD_ATTENDENCE_PROGRESS) {
    return {
      ...state,
      addAttendenceProgress: true,
    };
  }

  if (type === ADD_ATTENDENCE_SUCCESS) {
    return {
      ...state,
      addAttendenceProgress: false,
    };
  }

  if (type === ADD_ATTENDENCE_FAIL) {
    return {
      ...state,
      addAttendenceProgress: false,
    };
  }
  return state;
};
