import React, { useEffect } from 'react';
import { useAudioGame } from './audioGame.hook';
import { AudioCard } from './AudioCard';
import { NextShowButtons } from './NextShowButtons';
import { EndGame } from './EndGame';
import { Card } from 'react-bootstrap';
import { RepeatButton } from './RepeatButton';
import { useCheckPosition } from './CheckPosition';

export const Game: React.FC = () => {
  const { randomGameWords, hiddenWord, gameArr, isEndGame, setWords } = useAudioGame();
  const { gameWords } = useCheckPosition();
  useEffect(() => {
    setWords(gameWords);
  }, [randomGameWords]);
  if (!randomGameWords || !gameArr || !hiddenWord) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="audiocall-game">
      {isEndGame ? (
        <EndGame />
      ) : (
        <Card className="audiocall-game-card">
          <AudioCard words={gameArr} hiddenWord={hiddenWord} />
          <RepeatButton />
          <NextShowButtons />
        </Card>
      )}
    </div>
  );
};
