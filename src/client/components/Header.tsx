import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Header</h1>
      <Link to="/auth">auth</Link>
    </header>
  );
};
