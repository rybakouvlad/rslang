import React, { useState } from 'react';
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
  return <>{isStart ? <StartGame setIsStart={setIsStart} /> : <SavannahGame words={gameWords} />}</>;
}

export default SavannahFN;
