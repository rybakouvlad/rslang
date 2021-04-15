import React, { useEffect, useState } from 'react';
import { AudioCallGameProvider } from './audioGame.hook';
import { CheckPositionProvider } from '../../hooks/CheckPositionHook';
import { Game } from './Game';
import { Button, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import classNames from 'classnames';

export const AudioCallGame: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isFullScreenHandler = () => {
    setIsFullScreen(!isFullScreen);
  };
  useEffect(() => {
    document.addEventListener('fullscreenchange', isFullScreenHandler);
    return () => {
      document.removeEventListener('fullscreenchange', isFullScreenHandler);
    };
  });
  const fullScreenHandler = () => {
    if (!isFullScreen) {
      document.querySelector('.audiocall-wrapper').requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const audiocallGameWrapperClasses = classNames({
    'audiocall-wrapper': true,
    'audiocall-wrapper-full-screen': isFullScreen,
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Hot keys</Popover.Title>
      <Popover.Content>
        <ListGroup variant="flush">
          <ListGroup.Item>1, 2, 3, 4, 5 - номера слов </ListGroup.Item>
          <ListGroup.Item>&#9094;(enter) - следующее слово </ListGroup.Item>
          <ListGroup.Item>&rarr; - не знаю слово </ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );

  return (
    <section className={audiocallGameWrapperClasses}>
      <AudioCallGameProvider>
        <CheckPositionProvider>
          <div className="audiocall-game-header">
            <h1>Аудиовызов</h1>
            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z" />
                </svg>
              </div>
            </OverlayTrigger>
          </div>
          <Button className="full-screen-btn" variant="info" onClick={fullScreenHandler}>
            {isFullScreen ? 'выйти из полноэкранного режима' : 'на весь экран'}
          </Button>
          <Game />
        </CheckPositionProvider>
      </AudioCallGameProvider>
    </section>
  );
};
