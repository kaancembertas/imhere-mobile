import ImHereApi from '../../api/ImHereApi';
import { Alert } from 'react-native';
import {
  RESET_ATTENDENCE,
  ATTENDENCE_FAIL,
  ATTENDENCE_SUCCESS,
} from '../actionTypes';

export const getAttendence = (lectureCode) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ATTENDENCE_SUCCESS,
      });
      const response = await ImHereApi.getAttendence(lectureCode);
      if (!response.success) {
        Alert.alert('', response.errorMessage);
        dispatch({
          type: ATTENDENCE_FAIL,
        });
        return;
      }

      dispatch({
        type: ATTENDENCE_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ATTENDENCE_FAIL,
      });
    }
  };
};

export const resetAttendence = () => ({
  type: RESET_ATTENDENCE,
});
