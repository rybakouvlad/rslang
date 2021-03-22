import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../store/actions/auth';
import { Footer } from './Footer';
import { Header } from './Header';
import { Routes } from './Routes';

import { SmartMenu } from './SmartMenu';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return (
    <main className="body-wrapper">
      <SmartMenu />

      <section className="main-wrapper">
        <Header />
        <Routes />
        <Footer />
      </section>
    </main>
  );
};
