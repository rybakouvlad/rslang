import React, { Component } from 'react';
import Lifes from './Lifes';
import Cases from './Cases';
import GameOver from './GameOver';
import WordComponent from './WordComponent';
import sound_on from '../../assets/svg/sound_on.svg';
import sound_off from '../../assets/svg/sound_off.svg';
import full_screen_expand from '../../assets/svg/full_screen_expand.svg';
import full_screen_collapse from '../../assets/svg/full_screen_collapse.svg';
import { roundTimeLife } from './constants';
import { Word } from '../../types/book';
import { shuffle } from '../../utils/shuffleArray';
import wrong from '../../assets/sounds/wrong.mp3';
import correct from '../../assets/sounds/correct.mp3';

interface SavannahProps {
  words: Word[];
  checkWords(word: Word, result: boolean): void;
}

interface SavannahState {
  currentWord: { word: string; wordTranslate: string };
  muteSound: boolean;
  isFullScreen: boolean;
  answers: string[];
  lifes: number;
  words: Word[];
  index: number;
  gameOver: boolean;
  animation: boolean;
  roundExpired: number;
  statistics: {
    correct: Word[];
    wrong: Word[];
  };
}

class SavannahGame extends Component<SavannahProps, SavannahState> {
  private gameContainer: React.RefObject<HTMLDivElement>;
  constructor(props: SavannahProps) {
    super(props);
    this.gameContainer = React.createRef();
  }
  state = this.createInitState();

  createInitState(): SavannahState {
    const { words } = this.props;
    const wordsArray = shuffle(words);
    const { word: initWord, wordTranslate: initWordTranslate } = wordsArray[0];
    const wordsArrayWithoutInitWord = wordsArray.filter(({ word }) => word !== initWord);
    const answers = [...this.get3RandomAnswers(wordsArrayWithoutInitWord), initWordTranslate];
    const shuffledAnswers = shuffle(answers);

    return {
      currentWord: { word: initWord, wordTranslate: initWordTranslate },
      isFullScreen: false,
      muteSound: false,
      answers: shuffledAnswers,
      lifes: 5,
      words: wordsArray,
      index: 0,
      gameOver: false,
      animation: true,
      roundExpired: new Date().getTime() + roundTimeLife,
      statistics: {
        correct: [],
        wrong: [],
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
    const { muteSound } = this.state;

    if (muteSound) return;

    if (type === 'correct') {
      new Audio(correct).play();
    } else {
      new Audio(wrong).play();
    }
  };

  newRound = (index: number, isAnswerCorrect: boolean): void => {
    const isSavanaGameOpened = window.location.pathname.includes('savana');
    if (!isSavanaGameOpened) return;

    const {
      words,
      lifes,
      statistics: { correct, wrong },
      animation,
      gameOver,
    } = this.state;

    if (gameOver) return;

    const { checkWords } = this.props;
    const prevWord = words[index - 1];

    const currentLifes = isAnswerCorrect ? lifes : lifes - 1;

    isAnswerCorrect ? checkWords(prevWord, true) : checkWords(prevWord, false);

    const updatedStatistics = isAnswerCorrect
      ? { correct: [...correct, prevWord], wrong }
      : { correct, wrong: [...wrong, prevWord] };
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

  handleKeyUp = ({ key }: any): void => {
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

  updateIsFullScreen = () => {
    this.setState({ isFullScreen: !!document.fullscreenElement });
  };

  componentDidMount() {
    document.addEventListener('fullscreenchange', this.updateIsFullScreen);
    window.addEventListener('keyup', this.handleKeyUp);
    this.roundTimeOut();
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.updateIsFullScreen);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate() {
    this.roundTimeOut();
  }

  newGame = (): void => {
    const { muteSound } = this.state;
    const initState = this.createInitState();
    this.changeBGPosition('initial');
    this.setState({ ...initState, isFullScreen: !!document.fullscreenElement, muteSound });
  };

  toggleSound = () => {
    this.setState(({ muteSound }) => ({
      muteSound: !muteSound,
    }));
  };

  toggleFullScreen = (): void => {
    if (!document.fullscreenElement) {
      this.gameContainer.current.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  render() {
    const { currentWord, lifes, answers, index, gameOver, statistics, animation, isFullScreen, muteSound } = this.state;
    const soundImgSrc = muteSound ? sound_off : sound_on;
    const fullScreenSrc = isFullScreen ? full_screen_collapse : full_screen_expand;

    return (
      <>
        <h1 className="savannah-title">Саванна</h1>

        <div className='game-container' ref={this.gameContainer}>
          
          <img className='mute-sound' src={soundImgSrc} onClick={this.toggleSound}></img>
          <img className='full-screen' src={fullScreenSrc} onClick={this.toggleFullScreen}></img>
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
