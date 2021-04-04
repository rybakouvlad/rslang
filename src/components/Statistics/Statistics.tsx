import React from 'react';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';

export const Statistics: React.FC = () => {
  return (
    <div className="statistics-container">
      <BarChart data={[3, 2, 3, 2, 3]} labels={['24.03', '25.03', '26.03', '27.03', '28.03']} />
      <LineChart data={[1, 3, 3, 3, 3]} labels={['24.03', '25.03', '26.03', '27.03', '28.03']} />
    </div>
  );
};
