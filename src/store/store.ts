import { applyMiddleware, createStore } from 'redux';
import { save } from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(save({ namespace: 'rslang', states: ['settings'] }))),
);

export type RootState = ReturnType<typeof rootReducer>;
