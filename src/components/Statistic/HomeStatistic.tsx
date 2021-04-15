import React from 'react';
import { Link } from 'react-router-dom';

export const HomeStatistic: React.FC = () => {
  return (
    <div className="dictionary-container" >
    <h1 className="dictionary-header" style={{color: '#FC983A', marginTop: '5%', marginBottom: '12%'}}>Статистика</h1>
      <div className="dictionary-wrapper">
        <Link to="/statistic/short" className="dictionary-block learn-block">
          <div>Краткосрочная статистика</div>
        </Link>
        <Link to="/statistic/long" className="dictionary-block hard-block">
          <div>Долгосрочная статистика</div>
        </Link>
      </div>
    </div>
  );
};
