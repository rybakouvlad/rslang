import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { logout } from '../../store/actions/auth';
import { LoginIcon } from './LoginIcon';
import { LogOutIcon } from './LogOutIcon';

export const AuthIcon: React.FC = () => {
  const { token } = useTypeSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOutHandeler = () => {
    dispatch(logout());
  };
  return (
    <>
      {token ? (
        <a onClick={logOutHandeler}>
          <LogOutIcon />
        </a>
      ) : (
        <Link to="/auth">
          <LoginIcon />
        </Link>
      )}
    </>
  );
};
