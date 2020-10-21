import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout } from '../redux/actions/authActions';
import { getUserInfo } from '../redux/actions/userActions';

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

  const _authenticate = (email, password) => {
    setAuthprogress(true);
    dispatch(authenticate(email, password));
  };

  const _logout = () => {
    dispatch(logout());
    setAuthenticated(false);
  };

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

  const Provider = useCallback(
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
    [_authProgress, _isAuthenticated],
  );

  return Provider();
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('Authentication context could not be found');
  }
  return context;
};

export default AuthenticationProvider;
