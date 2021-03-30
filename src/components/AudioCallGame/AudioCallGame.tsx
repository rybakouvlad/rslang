import React from 'react';
import { AudioCallGameProvider } from './audioGame.hook';
import { CheckPositionProvider } from './CheckPosition';
import { Game } from './Game';

export const AudioCallGame: React.FC = () => {
  return (
    <section className="audiocall-wrapper">
      <AudioCallGameProvider>
        <CheckPositionProvider>
          <h1>Аудиовызов </h1>
          <Game />
        </CheckPositionProvider>
      </AudioCallGameProvider>
    </section>
  );
};
