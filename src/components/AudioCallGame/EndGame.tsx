import React from 'react';
import { useAudioGame } from './audioGame.hook';
import { IResults } from './Game';
interface iProps {
  results: IResults;
}
export const EndGame: React.FC<iProps> = (props: iProps) => {
  const { repeatGame } = useAudioGame();
  return (
    <div>
      <h1>Конец игры</h1>
      <div>
        <div>
          <div>Правильно:{props.results.correct}</div>
          {props.results.correctWords.map((el) => {
            return <div key={el.id}>{el.word}</div>;
          })}
        </div>
        <div>
          <div>Неправильно:{props.results.incorrect}</div>
          {props.results.incorrectWords.map((el) => {
            return <div key={el.id}>{el.word}</div>;
          })}
        </div>
      </div>
      <button onClick={repeatGame}>Повторить игру</button>
    </div>
  );
};
