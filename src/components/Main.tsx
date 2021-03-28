import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../store/actions/auth';
import { Footer } from './Footer';
import { Header } from './Header';
import { Routes } from './Routes';

import { SmartMenu } from './SmartMenu';
import { FetchUserWords } from '../store/actions/userWords';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
    const data = JSON.parse(localStorage.getItem('userData'));

    if (data && data.token) {
      dispatch(FetchUserWords());
    }
  }, [dispatch]);

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
