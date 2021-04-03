import React from 'react';

interface IProps {
  correct: number;
  incorrect: number;
}

export const Progress: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <div className="audiocall-progress audiocall-progress-correct">{props.correct}</div>
      <div className="audiocall-progress audiocall-progress-incorrect">{props.incorrect}</div>
    </>
  );
};
