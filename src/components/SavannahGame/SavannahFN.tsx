import React, { useState, useEffect } from 'react';
import SavannahGame from './SavannahGame';
import { StartGame } from '../Game/StartGame';

import { useCheckPosition } from '../../hooks/CheckPositionHook';
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
  const { checkWords } = useCheckPosition();
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
        <div className="savannah-wrapper">
          <h1 className="savannah-title">Саванна</h1>
          <StartGame setIsStart={setIsStart} />
        </div>
      ) : isLoading ? (
        <div>Загружаем игру...</div>
      ) : (
        <SavannahGame words={gameWords} checkWords={checkWords} />
      )}
    </>
  );
}

export default SavannahFN;
