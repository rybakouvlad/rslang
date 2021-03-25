import React from 'react';
import { useAudioGame } from './audio.hook';
import { AudioCard } from './AudioCard';
import { NextShowButtons } from './NextShowButtons';
import { EndGame } from './EndGame';
import { Card } from 'react-bootstrap';

export const Game: React.FC = () => {
  const { words, hiddenWord, gameArr, isEndGame } = useAudioGame();

  if (!words || !gameArr || !hiddenWord) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="audiocall-game">
      {isEndGame ? (
        <EndGame />
      ) : (
        <Card className="audiocall-game-card">
          <AudioCard words={gameArr} hiddenWord={hiddenWord} />
          <NextShowButtons />
        </Card>
      )}
    </div>
  );
};
