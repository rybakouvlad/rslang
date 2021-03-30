import React, { Component } from 'react';

interface GameOverProps {
  newGame: () => void;
  statistics: {
    correct: number;
    wrong: number;
  };
}

class GameOver extends Component<GameOverProps> {
  handleClick = (): void => {
    const { newGame } = this.props;
    newGame();
  }

  render(): JSX.Element {
    const {
      statistics: { correct, wrong },
    } = this.props;

    return (
      <div className="game-result contrast-color">
        <div>GAME OVER</div>
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
        <button className="new-game-btn" onClick={this.handleClick}>
          Начать игру заново
        </button>
      </div>
    );
  }
}

export default GameOver;
