import React, { useState, useEffect } from 'react';
import SavannahGame from './SavannahGame';
import { StartGame } from '../Game/StartGame';

import { useCheckPosition } from '../../hooks/CheckPositionHook';
// import { testWords } from './testWords';
import { CheckPositionProvider } from '../../hooks/CheckPositionHook';

function SavannahFN() {
  return (
    <CheckPositionProvider>
      <SavannahWrap />
    </CheckPositionProvider>
  );
}

function SavannahWrap() {
  const { gameWords } = useCheckPosition();
  const [isStart, setIsStart] = useState(true);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (gameWords.length !== 0) {
      setLoading(false);
    }
  }, [gameWords]);
  return (
    <>
      {isStart ? (
        <StartGame setIsStart={setIsStart} />
      ) : isLoading ? (
        <div>Загружаем игру...</div>
      ) : (
        <SavannahGame words={gameWords} />
      )}
    </>
  );
}

export default SavannahFN;
