import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './book';
import userWordsReducer from './userWords';
import aggregatedWordsReducer from './aggregatedWords';
const allReducers = {
  auth: authReducer,
  book: bookReducer,
  userWords: userWordsReducer,
  aggregatedWords: aggregatedWordsReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
