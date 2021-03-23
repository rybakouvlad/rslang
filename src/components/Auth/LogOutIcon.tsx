import React from 'react';
import { ReactComponent as LogoutSvg } from '../../assets/svg/logout.svg';

export const LogOutIcon: React.FC = () => {
  return (
    <div className="auth-logo-wrapper">
      <LogoutSvg />
    </div>
  );
};
