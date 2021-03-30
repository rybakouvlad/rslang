import React, { useState } from 'react';
import { TimerGame } from './TimerGame';
import { Score } from './Score';
import { testWords } from './../AudioCallGame/testWords';
import {useHotkeys} from 'react-hotkeys-hook';

function getRandomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}
function getNewArray(): Array<any> {
  const newSet = new Set<string>();
  while (newSet.size !== testWords.length) {
    newSet.add(testWords[getRandomNumber(testWords.length)].id);
  }
  return [...newSet];
}
function getWordObj(id: string) {
  return testWords.find((el) => el.id === id);
}

function getTranslation(id: string) {
  const variant = getRandomNumber(2);
  const trueTranslate = getWordObj(id).wordTranslate;
  if (variant) {
    return trueTranslate;
  } else {
    let wrongTranslate: string;
    do {
      wrongTranslate = testWords[getRandomNumber(testWords.length)].wordTranslate;
    } while (wrongTranslate === trueTranslate);
    return wrongTranslate;
  }
}
// const words = [['yes', 'да'], ['no', 'нет'], ['wool', 'шерсть'], ['yellow', 'жёлтый'], ['red', 'красный'], ['blue', 'голубой'], ['black', 'чёрный'], ['green', 'зелёный'], ['usually', 'обычно'], ['be', 'быть']];
export const Game: React.FC = () => {
  const [arr] = useState<Array<any>>(getNewArray());
  const [index, setIndex] = useState<number>(0);
  const currentTranslation = getTranslation(arr[index]);
  const yesHandler = () => {
    if (getWordObj(arr[index]).wordTranslate === currentTranslation) {
      console.log('yesHandler true');
      document.querySelector('.game-card').classList.add('correct-answer');
      setTimeout(() => {
        document.querySelector('.game-card').classList.remove('correct-answer');
      }, 500);
    } else {
      console.log('yesHandler false');
      document.querySelector('.game-card').classList.add('wrong-answer');
      setTimeout(() => {
        document.querySelector('.game-card').classList.remove('wrong-answer');
      }, 500);
    }
    setIndex(index + 1);
  };
  const noHandler = () => {
    console.log(currentTranslation)
    if (getWordObj(arr[index]).wordTranslate === currentTranslation) {
      console.log('noHandler false');
      document.querySelector('.game-card').classList.add('wrong-answer');
      setTimeout(() => {
        document.querySelector('.game-card').classList.remove('wrong-answer');
      }, 1000);
    } else {
      console.log('noHandler true');
      document.querySelector('.game-card').classList.add('correct-answer');
      setTimeout(() => {
        document.querySelector('.game-card').classList.remove('correct-answer');
      }, 1000);
    }
    setIndex(index + 1);
  };
  useHotkeys('left', () => {
    yesHandler();
  });
  useHotkeys('right', () => {
    noHandler();
  });
  return (
    <div className="game-card">
      <TimerGame />
      <Score />
      <div className="sprint-card">
        <div className="sprint-card-header">
          <p>{getWordObj(arr[index]).word}</p>
          <p>{currentTranslation}</p>
        </div>
        <div className="sprint-card-footer">
          <button className="yes-btn" onClick={() => yesHandler()}>да</button>
          <button className="no-btn" onClick={() => noHandler()}>нет</button>
        </div>
      </div>
    </div>
  );
};
