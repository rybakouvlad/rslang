import React from 'react';
import { useAudioGame } from './audio.hook';

export const EndGame: React.FC = () => {
  const { repeatGame } = useAudioGame();
  return (
    <div>
      <h1>Конец игры</h1>
      <button onClick={repeatGame}>Повторить игру</button>
    </div>
  );
};
