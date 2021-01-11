/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOGOUT } from './actionTypes';

//Middlewares
import authMiddleware from './middlewares/authMiddleware';

//Reducers
import auth from './reducers/authReducer';
import user from './reducers/userReducer';
import lecture from './reducers/lectureReducer';
import attendence from './reducers/attendenceReducer';

const combinedReducers = combineReducers({
  auth,
  user,
  lecture,
  attendence,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const logger = createLogger();
const composeEnhancers = composeWithDevTools || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(authMiddleware, reduxThunk, logger)),
);

export default store;
