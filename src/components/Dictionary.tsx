import React from 'react';
import Card from '../components/Card/Card';
import data from '../components/Card/dataForCard';

export const Dictionary: React.FC = () => {
  return (
    <div className="dictionary">
      <h1>Dictionary</h1>
      <ul className="cards-container">
        {data.map((elem) => (
          <Card key={elem.id} data={elem} />
        ))}
      </ul>
    </div>
  );
};
