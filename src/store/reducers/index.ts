import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './book';
import userWordsReducer from './userWords';
import aggregatedWordsReducer from './aggregatedWords';
import setStartGameState from './startGameState';
import dictionaryReducer from './dictionary';

const allReducers = {
  auth: authReducer,
  book: bookReducer,
  userWords: userWordsReducer,
  aggregatedWords: aggregatedWordsReducer,
  setStartGameState: setStartGameState,
  dictionary: dictionaryReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
