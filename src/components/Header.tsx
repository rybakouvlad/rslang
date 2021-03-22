import React from 'react';
import { AuthIcon } from './Auth/AuthIcon';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Header</h1>
      <AuthIcon />
    </header>
  );
};
