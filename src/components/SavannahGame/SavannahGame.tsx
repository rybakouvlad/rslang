import React, { Component } from 'react';
import Lifes from './Lifes';
import Cases from './Cases';
import GameOver from './GameOver';
import WordComponent from './WordComponent';
import { testWords } from './testWords';
import { roundTimeLife } from './constants';
import { Word } from '../../types/book';
import { shuffle } from '../../utils/shuffleArray';
import wrong from '../../assets/sounds/wrong.mp3';
import correct from '../../assets/sounds/correct.mp3';

interface SavannahState {
  currentWord: { word: string; wordTranslate: string };
  answers: string[];
  lifes: number;
  words: Word[];
  index: number;
  gameOver: boolean;
  animation: boolean;
  roundExpired: number;
  statistics: {
    correct: number;
    wrong: number;
  };
}

class SavannahGame extends Component<{}, SavannahState> {
  private gameContainer: React.RefObject<HTMLDivElement>;
  constructor({}) {
    super({});
    this.gameContainer = React.createRef();
  }
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
      animation: true,
      roundExpired: new Date().getTime() + roundTimeLife,
      statistics: {
        correct: 0,
        wrong: 0,
      },
    };
  }

  changeBGPosition(init?: string) {
    const gameContainer = this.gameContainer.current;
    if (init === 'initial') {
      gameContainer.style.backgroundPositionY = '100%';
      return;
    }
    const { words } = this.state;
    const changeStep = 100 / words.length;
    const currentBGPosition: number = Number.parseFloat(window.getComputedStyle(gameContainer).backgroundPositionY);
    const newPosition = currentBGPosition - changeStep;
    gameContainer.style.backgroundPositionY = `${newPosition}%`;
  }

  playSound = (type: 'correct' | 'wrong'): void => {
    if (type === 'correct') {
      new Audio(correct).play();
    } else {
      new Audio(wrong).play();
    }
  };

  newRound = (index: number, isAnswerCorrect: boolean): void => {
    const {
      words,
      lifes,
      statistics: { correct, wrong },
      animation,
      gameOver,
    } = this.state;
    if (gameOver) return;

    const currentLifes = isAnswerCorrect ? lifes : lifes - 1;
    const updatedStatistics = isAnswerCorrect ? { correct: correct + 1, wrong } : { correct, wrong: wrong + 1 };
    isAnswerCorrect ? this.playSound('correct') : this.playSound('wrong');
    const isGameOver = words.length < index + 1 || currentLifes === 0;

    if (isGameOver) {
      this.setState({ gameOver: true, statistics: updatedStatistics });
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
      statistics: updatedStatistics,
      roundExpired: new Date().getTime() + roundTimeLife,
      animation: !animation,
    });
  };

  get3RandomAnswers(wordsArray: Word[]): string[] {
    const shuffledWordsObj = shuffle(wordsArray);
    const shuffledWords = shuffledWordsObj.map((word) => word.wordTranslate);
    return shuffledWords.slice(-3);
  }

  handleKeyUp = (key: string): void => {
    const { index, currentWord, answers, gameOver } = this.state;
    if (gameOver) return;

    const correctKey = answers.indexOf(currentWord.wordTranslate) + 1;
    const isAvailibleKey = ['1', '2', '3', '4'].includes(key);
    if (isAvailibleKey) {
      const isAnswerCorrect = correctKey === +key;
      this.newRound(index + 1, isAnswerCorrect);
    }
  };

  isTimeOver = (): boolean => {
    const { roundExpired } = this.state;
    return new Date().getTime() - roundExpired > 0;
  };

  roundTimeOut = (): void => {
    const { index, gameOver } = this.state;
    setTimeout(() => {
      const isTimeOver = this.isTimeOver();
      if (isTimeOver && !gameOver) {
        this.newRound(index + 1, false);
      }
    }, roundTimeLife);
  };

  componentDidMount() {
    window.addEventListener('keyup', ({ key }) => this.handleKeyUp(key));
    this.roundTimeOut();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', ({ key }) => this.handleKeyUp(key));
  }

  componentDidUpdate() {
    this.roundTimeOut();
  }

  newGame = (): void => {
    const initState = this.createInitState();
    this.changeBGPosition('initial');
    this.setState(initState);
  };

  render() {
    const { currentWord, lifes, answers, index, gameOver, statistics, animation } = this.state;

    return (
      <>
        <h1>Саванна</h1>

        <div className="game-container" ref={this.gameContainer}>
          {gameOver ? (
            <GameOver newGame={this.newGame} statistics={statistics} />
          ) : (
            <>
              <Lifes lifesCounter={lifes} />
              {animation && <WordComponent currentWord={currentWord} />}
              {!animation && <WordComponent currentWord={currentWord} />}
              <Cases currentWord={currentWord} answers={answers} newRound={this.newRound} index={index} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default SavannahGame;
