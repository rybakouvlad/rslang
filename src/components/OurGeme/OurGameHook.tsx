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
  return (
    <>
      {isStart ? (
        <>
          <h1 className="our_game_name">Перетаскивание</h1>
          <StartGame setIsStart={setIsStart} />
        </>
      ) : (
        <OurGame words={words}></OurGame>
      )}
    </>
  );
};
