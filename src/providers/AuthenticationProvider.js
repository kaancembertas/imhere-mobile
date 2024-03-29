/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  authenticate,
  logout,
  setIsAuthenticated,
} from '../redux/actions/authActions';
import { getUserInfo } from '../redux/actions/userActions';
import auth from '@react-native-firebase/auth';
import {
  getData,
  removeData,
  storageKeys,
  storageTypes,
} from '../utils/asyncStorage';

const AuthenticationContext = createContext({
  isAuthenticated: false,
  authProgress: false,
  authenticate: (email, password) => {},
  logout: () => {},
});

const AuthenticationProvider = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const authProgress = useSelector(({ auth }) => auth.authProgress);

  const userInfoProgress = useSelector(({ user }) => user.userInfoProgress);
  const userInfoSuccess = useSelector(({ user }) => user.userInfoSuccess);

  const [_authProgress, setAuthprogress] = useState(false);
  const [_isAuthenticated, setAuthenticated] = useState(false);

  const isSelectedLecture = useSelector(
    ({ user }) => user.info.isSelectedLecture,
  );

  // Functions
  const _authenticate = (email, password) => {
    setAuthprogress(true);
    dispatch(authenticate(email, password));
  };

  const _logout = () => {
    setAuthenticated(false);
    dispatch(logout());
  };

  const initializeAuthentication = async () => {
    await auth().signInAnonymously();
    const authData = await getData(storageKeys.AUTH_DATA, storageTypes.JSON);
    if (authData === null) {
      console.log('[AutenticationProvider] No token found');
      SplashScreen.hide();
      return;
    }

    const expireDate = new Date(authData.expireDate);
    const now = new Date();

    if (now > expireDate) {
      console.log('[AutenticationProvider] Token expired, removed token');
      await removeData(storageKeys.AUTH_DATA);
      SplashScreen.hide();
      return;
    }

    // We have valid token, get userInfo
    console.log('[AutenticationProvider] We have valid token');
    dispatch(setIsAuthenticated(true));
    dispatch(getUserInfo());
  };

  // Effects

  // Effect for autologin
  useEffect(() => {
    initializeAuthentication();
  }, []);

  // Effect for logout
  useEffect(() => {
    if (!isAuthenticated) setAuthenticated(false);
  }, [isAuthenticated]);

  useEffect(() => {
    // Cannot authenticate finish progress
    if (!authProgress && !isAuthenticated) {
      setAuthprogress(false);
      return;
    }

    // Authentication complete, getUserInfo
    if (!authProgress && isAuthenticated) {
      dispatch(getUserInfo());
    }
  }, [authProgress]);

  useEffect(() => {
    // getUserInfo error, finish progress
    if (!userInfoProgress && !userInfoSuccess) {
      setAuthprogress(false);
      return;
    }

    // getUserInfo success, finish progress
    // give app access
    if (!userInfoProgress && userInfoSuccess) {
      setAuthprogress(false);
      setAuthenticated(true);
    }
  }, [userInfoProgress]);

  useEffect(() => {
    // When user is granted, close SplashScreen
    if (_isAuthenticated) SplashScreen.hide();
  }, [_isAuthenticated]);

  return useMemo(
    () => (
      <AuthenticationContext.Provider
        value={{
          authenticate: _authenticate,
          logout: _logout,
          authProgress: _authProgress,
          isAuthenticated: _isAuthenticated,
        }}>
        {children}
      </AuthenticationContext.Provider>
    ),
    [_isAuthenticated, _authProgress, isSelectedLecture],
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('Authentication context could not be found');
  }
  return context;
};

export default AuthenticationProvider;
