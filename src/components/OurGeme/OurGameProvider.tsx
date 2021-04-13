import React from 'react';
import { CheckPositionProvider } from '../../hooks/CheckPositionHook';
// import { OurGame } from './OurGame';
import { OurGameHook } from './OurGameHook';

export const OurGameProvider: React.FC = () => {
  return (
    <CheckPositionProvider>
      <OurGameHook />
    </CheckPositionProvider>
  );
};
