import React, { useEffect, useState } from 'react';
import { OurGame } from './OurGame';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { StartGame } from 'Components/Game/StartGame';

export const OurGameHook: React.FC = () => {
  const { gameWords } = useCheckPosition();
  const [words, setWords] = useState(null);
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    if (!isStart) {
      setWords(gameWords);
    }
  }, [isStart, gameWords]);
  return <div>{isStart ? <StartGame setIsStart={setIsStart} /> : <OurGame words={words}></OurGame>}</div>;
};
