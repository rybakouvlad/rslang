import React from 'react';
import '../styles/styles.scss';
import { Main } from '../components/Main';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Main />
      </React.Fragment>
    </Provider>
  );
};
