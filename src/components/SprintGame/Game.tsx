import React, { useState } from 'react';
import { TimerGame } from './TimerGame';
import { Score } from './Score';
// import { useHotkeys } from 'react-hotkeys-hook';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';
import { SoundToggle } from 'Components/SprintGame/SoundToggle';
import { EndGame } from './EndGame';
import { Button } from 'react-bootstrap';

function getRandomNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

export const Game: React.FC = () => {
  const { isPlaySound, playSound, timer, score, setScore, isFullScreen, setIsFullScreen } = useSprintGame();
  const { gameWords } = useCheckPosition();
  const [arr] = useState<Array<string>>(getNewArray());
  const [index, setIndex] = useState<number>(0);
  const [currentTranslation, setCurrentTranslation] = useState(getTranslation(arr[index]));
  const [trueTimes, setTrueTimes] = useState(0);
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
  const rightAnswer = () => {
    document.querySelector('.game-card').classList.add('correct-answer');
    setTimeout(() => {
      document.querySelector('.game-card').classList.remove('correct-answer');
    }, 500);
    isPlaySound && playSound('correct');
    setTrueTimes(trueTimes + 1);
    sumScore();
  };
  const wrongAnswer = () => {
    document.querySelector('.game-card').classList.add('wrong-answer');
    setTimeout(() => {
      document.querySelector('.game-card').classList.remove('wrong-answer');
    }, 500);
    isPlaySound && playSound('wrong');
    setTrueTimes(0);
  };
  const yesHandler = () => {
    getWordObj(arr[index]).wordTranslate === currentTranslation ? rightAnswer() : wrongAnswer();
    setIndex(index + 1);
    setCurrentTranslation(getTranslation(arr[index + 1]));
  };
  const noHandler = () => {
    getWordObj(arr[index]).wordTranslate === currentTranslation ? wrongAnswer() : rightAnswer();

    setIndex(index + 1);
    setCurrentTranslation(getTranslation(arr[index + 1]));
  };

  return (
    <>
      {timer ? (
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
                <p>{getWordObj(arr[index]).word}</p>
                <p>{currentTranslation}</p>
              </div>
              <div className="sprint-card-footer">
                <button className="yes-btn" onClick={yesHandler}>
                  да
                </button>
                <button className="no-btn" onClick={noHandler}>
                  нет
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EndGame />
      )}
    </>
  );
};
