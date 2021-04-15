import React from 'react';
// import { Button } from 'react-bootstrap';
// import { useAudioGame } from './audioGame.hook';
import { IResults } from './Game';
interface iProps {
  results: IResults;
}
export const EndGame: React.FC<iProps> = (props: iProps) => {
  // const { repeatGame } = useAudioGame();
  return (
    <div className="audiocall-end">
      <h1>Конец игры</h1>
      <div className="audiocall-result">
        <div className="audiocall-result-col">
          <div
            className="audiocall-result-row audiocall-true"
            style={{ fontWeight: 700 }}
          >{`Правильно: ${props.results.correct}`}</div>
          {props.results.correctWords.map((el) => {
            return (
              <div className="audiocall-result-row audiocall-true" key={el.id}>
                {`${el.word} - ${el.wordTranslate}`}
              </div>
            );
          })}
        </div>
        <div>
          <div
            className="audiocall-result-row audiocall-false"
            style={{ fontWeight: 700 }}
          >{`Неправильно: ${props.results.incorrect}`}</div>
          {props.results.incorrectWords.map((el) => {
            return (
              <div className="audiocall-result-row audiocall-false" key={el.id}>
                {`${el.word} - ${el.wordTranslate}`}
              </div>
            );
          })}
        </div>
      </div>
      {/*<Button onClick={repeatGame}>Повторить игру</Button>*/}
    </div>
  );
};
