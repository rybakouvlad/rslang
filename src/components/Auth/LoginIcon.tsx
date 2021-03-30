import React from 'react';
import { ReactComponent as LogInSvg } from '../../assets/svg/Enter.svg';

export const LoginIcon: React.FC = () => {
  return (
    <div className="auth-logo-wrapper">
      <LogInSvg />
    </div>
  );
};
