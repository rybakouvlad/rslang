import React from 'react';
import { Link } from 'react-router-dom';

export const SmartMenu: React.FC = () => {
  return (
    <>
      <div className="smart-menu">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
      </div>
    </>
  );
};
