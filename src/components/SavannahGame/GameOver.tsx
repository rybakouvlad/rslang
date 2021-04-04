import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Word } from '../../types/book';

interface GameOverProps {
  newGame: () => void;
  statistics: {
    correct: Word[];
    wrong: Word[];
  };
}

class GameOver extends Component<GameOverProps> {
  handleClick = (): void => {
    const { newGame } = this.props;
    newGame();
  };

  render(): JSX.Element {
    const {
      statistics: { correct, wrong },
    } = this.props;

    return (
      // <div className="game-result contrast-color">
      //   <div>GAME OVER</div>
      //   <div>Correct: {correct.length}</div>
      //   <div>Wrong: {wrong.length}</div>
      //   <button className="new-game-btn" onClick={this.handleClick}>
      //     Начать игру заново
      //   </button>
      // </div>
      <div className="game-over-wrapper">
        <div className="audiocall-end">
          <h1>Конец игры</h1>
          <div className="audiocall-result">
            <div className="audiocall-result-col">
              <div className="audiocall-result-row audiocall-true">Правильно:{correct.length}</div>
              {correct.map((el) => {
                return (
                  <div className="audiocall-result-row audiocall-true" key={el.id}>
                    {el.word}-{el.wordTranslate}
                  </div>
                );
              })}
            </div>
            <div>
              <div className="audiocall-result-row audiocall-false">Неправильно:{wrong.length}</div>
              {wrong.map((el) => {
                return (
                  <div className="audiocall-result-row audiocall-false" key={el.id}>
                    {el.word}-{el.wordTranslate}
                  </div>
                );
              })}
            </div>
          </div>
          <Button onClick={this.handleClick}>Повторить игру</Button>
        </div>
      </div>
    );
  }
}

export default GameOver;
