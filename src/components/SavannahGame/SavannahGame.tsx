import React, { Component } from 'react';
import './savannah.scss';
import Lifes from './Lifes';
import Cases from './Cases';
import WordComponent from './WordComponent';
import { testWords } from './testWords';
import { Word } from '../../types/book';
import { shuffle } from '../../utils/shuffleArray';

interface SavannahState {
  currentWord: { word: string; wordTranslate: string };
  answers: string[];
  lifes: number;
  words: Word[];
  index: number;
  gameOver: boolean;
}

class SavannahGame extends Component<{}, SavannahState> {
  state = this.createInitState();

  createInitState(): SavannahState {
    const wordsArray = shuffle(testWords);
    const { word: initWord, wordTranslate: initWordTranslate } = wordsArray[0];
    const wordsArrayWithoutInitWord = wordsArray.filter(({ word }) => word !== initWord);
    const answers = [...this.get3RandomAnswers(wordsArrayWithoutInitWord), initWordTranslate];
    const shuffledAnswers = shuffle(answers);

    return {
      currentWord: { word: initWord, wordTranslate: initWordTranslate },
      answers: shuffledAnswers,
      lifes: 5,
      words: wordsArray,
      index: 0,
      gameOver: false,
    };
  }

  changeBGPosition() {
    const { words } = this.state;
    const changeStep = 100 / words.length;
    const gameContainer: HTMLElement = document.querySelector('.game-container');
    const currentBGPosition: number = Number.parseFloat(window.getComputedStyle(gameContainer).backgroundPositionY);
    const newPosition = currentBGPosition - changeStep;
    gameContainer.style.backgroundPositionY = `${newPosition}%`;
  }

  newRound = (index: number, isAnswerCorrect: boolean): void => {
    const { words, lifes } = this.state;

    const currentLifes = isAnswerCorrect ? lifes : lifes - 1;
    const isGameOver = words.length < index + 1 || currentLifes === 0;

    if (isGameOver) {
      this.setState({ gameOver: true });
      return;
    }

    if (isAnswerCorrect) {
      this.changeBGPosition();
    }


    const { word, wordTranslate } = words[index];
    const wordsWithoutCurrentWord = words.filter((wordObj) => wordObj.word !== word);
    const answers = [...this.get3RandomAnswers(wordsWithoutCurrentWord), wordTranslate];
    const shuffledAnswers = shuffle(answers);

    this.setState({
      currentWord: { word, wordTranslate },
      answers: shuffledAnswers,
      index,
      lifes: currentLifes,
    });
  };

  get3RandomAnswers(wordsArray: Word[]): string[] {
    const shuffledWordsObj = shuffle(wordsArray);
    const shuffledWords = shuffledWordsObj.map((word) => word.wordTranslate);
    return shuffledWords.slice(-3);
  }

  render() {
    const { currentWord, lifes, answers, index, gameOver } = this.state;
    return (
      <>
        <h1>Саванна</h1>

        <div className="game-container">
          {gameOver ? (
            <div className="game-result">
              <div>GAME OVER</div>
              <div>Popup with statistic</div>
            </div>
          ) : (
            <>
              <Lifes lifesCounter={lifes} />
              <WordComponent currentWord={currentWord} />
              <Cases currentWord={currentWord} answers={answers} newRound={this.newRound} index={index} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default SavannahGame;
