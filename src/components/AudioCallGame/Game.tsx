import React, { useEffect, useState } from 'react';
import { useAudioGame } from './audioGame.hook';
import { AudioCard } from './AudioCard';
import { NextShowButtons } from './NextShowButtons';
import { EndGame } from './EndGame';
import { Card } from 'react-bootstrap';
import { RepeatButton } from './RepeatButton';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { StartGame } from '../Game/StartGame';
import { Word } from '../../types/book';

export interface IResults {
  correct: number;
  incorrect: number;
  correctWords: Word[];
  incorrectWords: Word[];
}

export const Game: React.FC = () => {
  const { hiddenWord, gameArr, isEndGame, setWords } = useAudioGame();
  const { gameWords } = useCheckPosition();
  const [isStart, setIsStart] = useState(true);
  const [results, setResults] = useState<IResults>({
    correct: 0,
    incorrect: 0,
    correctWords: [],
    incorrectWords: [],
  });

  useEffect(() => {
    if (!isStart) {
      setWords(gameWords);
    }
  }, [isStart, gameWords]);

  if (!gameWords) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="audiocall-game">
      {isStart ? (
        <StartGame setIsStart={setIsStart} />
      ) : isEndGame ? (
        <EndGame results={results} />
      ) : (
        <Card className="audiocall-game-card">
          <AudioCard words={gameArr} hiddenWord={hiddenWord} results={results} setResults={setResults} />
          <RepeatButton />
          <NextShowButtons />
        </Card>
      )}
    </div>
  );
};
