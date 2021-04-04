import React from 'react';
import { OurGame } from './OurGame';
import { useCheckPosition } from '../../hooks/CheckPositionHook';

export const OurGameHook: React.FC = () => {
  const { gameWords } = useCheckPosition();
  console.log(gameWords);
  return <OurGame words={gameWords}></OurGame>;
};
