import React from 'react';
import { Link } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { LoginIcon } from './LoginIcon';
import { LogOutIcon } from './LogOutIcon';

export const AuthIcon: React.FC = () => {
  const { token } = useTypeSelector((state) => state.auth);

  return (
    <>
      {token ? (
        <LogOutIcon />
      ) : (
        <Link to="/auth">
          <LoginIcon />
        </Link>
      )}
    </>
  );
};
