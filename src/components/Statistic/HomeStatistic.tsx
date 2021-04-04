import React from 'react';
import { Link } from 'react-router-dom';

export const HomeStatistic: React.FC = () => {
  return (
    <>
      <h1>Статистика</h1>
      <div className="dictionary-wrapper">
        <Link to="/statistic/short" className="dictionary-block learn-block">
          <div>Короткая статистика</div>
        </Link>
        <Link to="/statistic/long" className="dictionary-block hard-block">
          <div>Длинная статистика</div>
        </Link>
      </div>
    </>
  );
};
