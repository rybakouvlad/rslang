import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './book';
import userWordsReducer from './userWords';

const allReducers = {
  auth: authReducer,
  book: bookReducer,
  userWords: userWordsReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
