import React, { useEffect, useState } from 'react';
import { Game } from './Game';
import { useSprintGame } from './sprintGame.hook';
import classNames from 'classnames';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { StartGame } from 'Components/Game/StartGame';
import { ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';

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
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Hot keys</Popover.Title>
      <Popover.Content>
        <ListGroup variant="flush">
          <ListGroup.Item>&larr; да </ListGroup.Item>
          <ListGroup.Item>&rarr; нет </ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      {gameWords ? (
        <div className={sprintGameClasses}>
          <div className="sprint-game-header">
            <h1>Спринт</h1>
            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z" />
                </svg>
              </div>
            </OverlayTrigger>
          </div>
          {!isStart ? !isLoading && <Game /> : <StartGame setIsStart={setIsStart} />}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};
