import React from 'react';
import { useTypeSelector } from '../hooks/useTypesSelector';
import { AuthIcon } from './Auth/AuthIcon';

export const Header: React.FC = () => {
  const { name } = useTypeSelector((state) => state.auth);
  return (
    <header className="header">
      {name && <h4>Привет {name}</h4>}

      <AuthIcon />
    </header>
  );
};
