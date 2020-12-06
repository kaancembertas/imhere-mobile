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
    console.log('[authMiddleware] Stored Token to AsyncStorage');
  }

  if (action.type === LOGOUT) {
    await removeData(storageKeys.AUTH_DATA);
    console.log('[authMiddleware] Removed Token from AsyncStorage');
  }

  return next(action);
};
