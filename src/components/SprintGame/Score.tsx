import React from 'react';

interface ScoreProps {
  scoreNumber: number;
}

export const Score = ({ scoreNumber }: ScoreProps) => {
  return (
    <div className="sprint-score">
      <p>Баллов:</p>
      <p>{scoreNumber}</p>
    </div>
  );
};
