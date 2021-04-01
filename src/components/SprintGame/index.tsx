import React, { useState } from 'react';
import { Game } from './Game';

export const SprintGame: React.FC = () => {
  const [isStart, setIsStart] = useState(false);
  return (
    <div className="sprint-game">
      <h1>Спринт</h1>
      {isStart ? (
        <Game />
      ) : (
        <button className="start-sprint-btn" onClick={() => setIsStart(true)}>
          начать игру
        </button>
      )}
    </div>
  );
};
