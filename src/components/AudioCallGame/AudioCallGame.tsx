import React from 'react';
import { AudioCallGameProvider } from './audio.hook';
import { Game } from './Game';

export const AudioCallGame: React.FC = () => {
  return (
    <section className="audiocall-wrapper">
      <AudioCallGameProvider>
        <h1>Аудиовызов </h1>
        <Game />
      </AudioCallGameProvider>
    </section>
  );
};
