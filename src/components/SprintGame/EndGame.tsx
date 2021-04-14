import React from 'react';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';
import { IResults } from './Game';
interface iProps {
  results: IResults;
}
export const EndGame: React.FC<iProps> = (props: iProps) => {
  const { score } = useSprintGame();

  return (
    <div className="audiocall-end">
      <h3>Конец игры</h3>
      <h4>Набранные баллы: {score}</h4>
      <div className="audiocall-result">
        <div className="audiocall-result-col">
          <div className="audiocall-result-row audiocall-true" style={{ fontWeight: 700 }}>Правильно: {props.results.correctWords.length}</div>
          {props.results.correctWords.map((el, index) => {
            return (
              <div className="audiocall-result-row audiocall-true" key={el.id}>
                {`${el.word} - ${el.wordTranslate}`}
              </div>
            );
          })}
        </div>
        <div>
          <div className="audiocall-result-row audiocall-false" style={{ fontWeight: 700 }}>Неправильно: {props.results.incorrectWords.length}</div>
          {props.results.incorrectWords.map((el, index) => {
            return (
              <div className="audiocall-result-row audiocall-false" key={el.id}>
                {`${el.word} - ${el.wordTranslate}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
