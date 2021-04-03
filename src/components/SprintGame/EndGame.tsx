import React from 'react';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';

export const EndGame: React.FC = () => {
  const { score } = useSprintGame();

  return (
    <div>
      <h1>Конец игры</h1>
      <h1>Набранные баллы: {score}</h1>
    </div>
  );
};
