import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Routes } from './Routes';

import { SmartMenu } from './SmartMenu';
export const Main: React.FC = () => {
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
