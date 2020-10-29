import {
  removeData,
  storageKeys,
  storageTypes,
  storeData,
} from '../../utils/asyncStorage';
import { AUTH_SUCCESS, LOGOUT } from '../actionTypes';

export default authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTH_SUCCESS) {
    const { payload } = action;
    await storeData(storageKeys.AUTH_DATA, storageTypes.JSON, payload);
  }

  if (action.type === LOGOUT) {
    await removeData(storageKeys.AUTH_DATA);
  }

  return next(action);
};
