import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../store/actions/auth';
import { Footer } from './Footer';
import { Header } from './Header';
import { Routes } from './Routes';

import { SmartMenu } from './SmartMenu';
import { FetchUserWords } from '../store/actions/userWords';
import { useTypeSelector } from '../hooks/useTypesSelector';

export const Main: React.FC = () => {
  const { loading, token } = useTypeSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(FetchUserWords());
    }
  }, [token]);
  if (loading) {
    return <h1>LOADING</h1>;
  }
  return (
    <div>
      <main className="body-wrapper">
        <SmartMenu />

        <section className="main-wrapper">
          <Header />
          <Routes />
          <Footer />
        </section>
      </main>
    </div>
  );
};
