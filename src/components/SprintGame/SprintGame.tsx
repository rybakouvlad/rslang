import React, { useEffect, useState } from 'react';
import { Game } from './Game';
import { useSprintGame } from './sprintGame.hook';
import classNames from 'classnames';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { StartGame } from 'Components/Game/StartGame';

export const SprintGame: React.FC = () => {
  const [isStart, setIsStart] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isFullScreen } = useSprintGame();
  const { gameWords } = useCheckPosition();
  useEffect(() => {
    if (gameWords.length !== 0) {
      setIsLoading(false);
    }
  }, [gameWords]);
  const sprintGameClasses = classNames({
    'sprint-game': true,
    'sprint-full-screen': isFullScreen,
  });

  return (
    <>
      {console.log('%%%%%%%%%%', !!gameWords)}
      {gameWords ? (
        <div className={sprintGameClasses}>
          <h1>Спринт</h1>
          {!isStart ? !isLoading && <Game /> : <StartGame setIsStart={setIsStart} />}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};
