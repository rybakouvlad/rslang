import React, { Component } from 'react';
import './savannah.scss';
import Lifes from './Lifes';
import Cases from './Cases';
import WordComponent from './WordComponent';
import { testWords } from './testWords';
import { Word } from '../../types/book';
import { shuffle } from '../../utils/shuffleArray';

interface SavannahState {
  currentWord: string;
  answers: string[];
  lifes: number;
  words: Word[];
  index: number;
}

class SavannahGame extends Component<{}, SavannahState> {
  state = this.createInitState();

  createInitState(): SavannahState {
    const wordsArray = shuffle(testWords);
    const { word: initWord, wordTranslate: initWordTranslate } = wordsArray[0];
    const wordsArrayWithoutInitWord = wordsArray.filter(({ word }) => word !== initWord);
    const answers = [...this.get4RandomAnswers(wordsArrayWithoutInitWord), initWordTranslate];
    const shuffledAnswers = shuffle(answers);

    return {
      currentWord: initWord,
      answers: shuffledAnswers,
      lifes: 5,
      words: wordsArray,
      index: 0,
    };
  }

  newRound = (index: number): void => {
    const { words } = this.state;
    if (words.length === index + 1) return;

    const { word, wordTranslate } = words[index];
    const wordsWithoutCurrentWord = words.filter((wordObj) => wordObj.word !== word);
    const answers = [...this.get4RandomAnswers(wordsWithoutCurrentWord), wordTranslate];
    const shuffledAnswers = shuffle(answers);

    this.setState({
      currentWord: word,
      answers: shuffledAnswers,
      index,
    });
  };

  get4RandomAnswers(wordsArray: Word[]): string[] {
    const shuffledWordsObj = shuffle(wordsArray);
    const shuffledWords = shuffledWordsObj.map((word) => word.wordTranslate);
    return shuffledWords.slice(-4);
  }

  render() {
    const { currentWord, lifes, answers, index } = this.state;
    return (
      <>
        <h1>Саванна</h1>
        <div className="game-container">
          <Lifes lifesCounter={lifes} />
          <WordComponent currentWord={currentWord} />
          <Cases answers={answers} newRound={this.newRound} index={index} />
        </div>
      </>
    );
  }
}

export default SavannahGame;
