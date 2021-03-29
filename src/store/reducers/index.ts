import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './book';

const allReducers = {
  auth: authReducer,
  book: bookReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
