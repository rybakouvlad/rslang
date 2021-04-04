import React, { useEffect, useState } from 'react';
import { TimerGame } from './TimerGame';
import { Score } from './Score';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';
import { SoundToggle } from 'Components/SprintGame/SoundToggle';
import { EndGame } from './EndGame';
import { Button } from 'react-bootstrap';
import { Word } from '../../types/book';

export interface IResults {
  correctWords: Word[];
  incorrectWords: Word[];
}
function getRandomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

export const Game: React.FC = () => {
  const {
    isPlaySound,
    playSound,
    isTimer,
    setIsTimer,
    score,
    setScore,
    isFullScreen,
    setIsFullScreen,
  } = useSprintGame();
  const { gameWords, checkWords, getPrevPageWords } = useCheckPosition();
  const [arr, setArr] = useState<Array<string>>();
  const [index, setIndex] = useState<number>();
  const [currentTranslation, setCurrentTranslation] = useState<string>();
  const [currentWord, setCurrentWord] = useState<string>();
  const [trueTimes, setTrueTimes] = useState(0);
  const [results, setResults] = useState<IResults>({
    correctWords: [],
    incorrectWords: [],
  });
  function getNewArray(): Array<string> {
    const newSet = new Set<string>();
    while (newSet.size !== gameWords.length) {
      newSet.add(gameWords[getRandomNumber(gameWords.length)].id);
    }
    return [...newSet];
  }

  function getWordObj(id: string) {
    return gameWords.find((el) => el.id === id);
  }

  function getTranslation(id: string) {
    const variant = getRandomNumber(2);
    const trueTranslate = getWordObj(id).wordTranslate;
    if (variant) {
      return trueTranslate;
    } else {
      let wrongTranslate: string;
      do {
        wrongTranslate = gameWords[getRandomNumber(gameWords.length)].wordTranslate;
      } while (wrongTranslate === trueTranslate);
      return wrongTranslate;
    }
  }

  const sumScore = () => {
    const newTrueTimes = trueTimes + 1;
    const newScore = score + Math.ceil(newTrueTimes / 3) * 6;
    setScore(newScore);
  };
  const preparationNextWord = () => {
    if (gameWords.length - 1 !== index) {
      setCurrentWord(getWordObj(arr[index + 1]).word);
      setCurrentTranslation(getTranslation(arr[index + 1]));
      setIndex(index + 1);
    } else {
      !getPrevPageWords() && setIsTimer(false);
    }
  };
  const rightAnswer = () => {
    document.querySelector('.game-card').classList.add('correct-answer');
    setTimeout(() => {
      document.querySelector('.game-card').classList.remove('correct-answer');
    }, 500);
    setResults({
      ...results,
      correctWords: [...results.correctWords, getWordObj(arr[index])],
    });
    checkWords(getWordObj(arr[index]), true);
    preparationNextWord();
    isPlaySound && playSound('correct');
    setTrueTimes(trueTimes + 1);
    sumScore();
  };
  const wrongAnswer = () => {
    document.querySelector('.game-card').classList.add('wrong-answer');
    setTimeout(() => {
      document.querySelector('.game-card').classList.remove('wrong-answer');
    }, 500);
    setResults({
      ...results,
      incorrectWords: [...results.incorrectWords, getWordObj(arr[index])],
    });
    checkWords(getWordObj(arr[index]), false);
    preparationNextWord();
    isPlaySound && playSound('wrong');
    setTrueTimes(0);
  };
  const yesHandler = () => {
    getWordObj(arr[index]).wordTranslate === currentTranslation ? rightAnswer() : wrongAnswer();
  };
  const noHandler = () => {
    getWordObj(arr[index]).wordTranslate === currentTranslation ? wrongAnswer() : rightAnswer();
  };
  const handlerHotKeys = ({ key }: any): void => {
    if (key === 'ArrowLeft') {
      yesHandler();
    } else if (key === 'ArrowRight') {
      noHandler();
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', handlerHotKeys);
    return () => {
      window.removeEventListener('keyup', handlerHotKeys);
    };
  });
  useEffect(() => {
    const newArr = getNewArray();
    setArr(newArr);
    setIndex(0);
    setCurrentWord(getWordObj(newArr[0]).word);
    setCurrentTranslation(getTranslation(newArr[0]));
  }, [gameWords]);
  return (
    <>
      {isTimer && gameWords.length !== index && arr ? (
        <>
          <div className="sprint-game-settings">
            <SoundToggle />
            <Button className="full-screen-btn" variant="info" onClick={() => setIsFullScreen(!isFullScreen)}>
              {isFullScreen ? 'выйти из полноэкранного режима' : 'на весь экран'}
            </Button>
          </div>
          <div className="game-card">
            <TimerGame />
            <Score scoreNumber={score} />
            <div className="sprint-card">
              <div className="sprint-card-header">
                <p>{currentWord}</p>
                <p>{currentTranslation}</p>
              </div>
              <div className="sprint-card-footer">
                <button className="yes-btn" onClick={yesHandler}>
                  &larr; да
                </button>
                <button className="no-btn" onClick={noHandler}>
                  нет &rarr;
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EndGame results={results} />
      )}
    </>
  );
};
