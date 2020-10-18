import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

//Reducers
import auth from './reducers/authReducer';
import user from './reducers/userReducer';
import lecture from './reducers/lectureReducer';

const combinedReducers = combineReducers({
  auth,
  user,
  lecture,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

const logger = createLogger();
const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk, logger)),
);

export default store;
