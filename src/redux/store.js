import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

//Reducers
import auth from './reducers/authReducer';

const combinedReducers = combineReducers({
  auth,
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
