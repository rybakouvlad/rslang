import React from 'react';
import { ReactComponent as UserSvg } from '../../assets/svg/user.svg';

export const LoginIcon: React.FC = () => {
  return (
    <div className="auth-logo-wrapper">
      <UserSvg />
    </div>
  );
};
