import React, { MouseEvent } from 'react';
import { IWord } from './Game';
interface IProps {
  words: IWord[];
  hiddenWord: IWord;
}

export const AudioCard: React.FC<IProps> = (props: IProps) => {
  const checkHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if ((event.target as HTMLButtonElement).dataset.id === props.hiddenWord.id) {
      console.log('ураа');
    }

    // console.log((event.target as HTMLButtonElement).dataset.id);
  };

  return (
    <div className="audiocall-game-card">
      <div className="audiocall-game-header-card">footer</div>
      <div className="audiocall-game-body-card">
        {props.words.map((el, i) => {
          return (
            <button key={i} data-id={el.id} onClick={checkHandler}>
              {el.word}
            </button>
          );
        })}
      </div>
      <div className="audiocall-game-footer-card">footer</div>
    </div>
  );
};
