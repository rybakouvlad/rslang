import React from 'react';
import { Link } from 'react-router-dom';

export const DictionaryHome: React.FC = () => {
  return (
    <>
      <h1>Dictionary</h1>
      <div className="dictionary-wrapper">
        <Link to="/dictionary/learn" className="dictionary-block learn-block">
          <div>Изучаемые слова</div>
        </Link>
        <Link to="/dictionary/hard" className="dictionary-block hard-block">
          <div>Сложные слова</div>
        </Link>
        <Link to="/dictionary/deleted" className="dictionary-block delete-block">
          <div>Удалённые слова</div>
        </Link>
      </div>
    </>
  );
};
