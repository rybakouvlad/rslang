import React from 'react';
interface ScoreProps {
  scoreNumber: number;
}
export const Score = ({ scoreNumber }: ScoreProps) => {
  return <div>{scoreNumber}</div>;
};
