import React, { useState } from 'react';
import { Game } from './Game';
import { useSprintGame } from './sprintGame.hook';
import classNames from 'classnames';

export const SprintGame: React.FC = () => {
  const [isStart, setIsStart] = useState(false);
  const { isFullScreen } = useSprintGame();
  const sprintGameClasses = classNames({
    'sprint-game': true,
    'sprint-full-screen': isFullScreen,
  });
  return (
    <>
      <div className={sprintGameClasses}>
        <h1>Спринт</h1>
        {isStart ? (
          <Game />
        ) : (
          <button className="start-sprint-btn" onClick={() => setIsStart(true)}>
            начать игру
          </button>
        )}
      </div>
    </>
  );
};
