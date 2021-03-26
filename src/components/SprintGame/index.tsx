import React, { useState } from 'react';
import { Game } from './Game';

export const SprintGame: React.FC = () => {
  const [isStart, setIsStart] = useState(false);
  return (
    <div>
      <h2>Sprint Game</h2>
      {isStart ? <Game /> : <button onClick={() => setIsStart(true)}>Начать игру</button>}
    </div>
  );
};
