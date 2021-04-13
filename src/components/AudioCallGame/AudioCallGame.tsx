import React, { useState } from 'react';
import { AudioCallGameProvider } from './audioGame.hook';
import { CheckPositionProvider } from '../../hooks/CheckPositionHook';
import { Game } from './Game';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

export const AudioCallGame: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenHandler = () => {
    if(!isFullScreen){
      document.querySelector('.audiocall-wrapper').requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  }
  const audiocallGameWrapperClasses = classNames({
    'audiocall-wrapper': true,
    'audiocall-wrapper-full-screen': isFullScreen,
  });
  return (
    <section className={audiocallGameWrapperClasses}>
      <AudioCallGameProvider>
        <CheckPositionProvider>
          <h1>Аудиовызов</h1>
          <Button className="full-screen-btn" variant="info" onClick={fullScreenHandler}>
            {isFullScreen ? 'выйти из полноэкранного режима' : 'на весь экран'}
          </Button>
          <Game />
        </CheckPositionProvider>
      </AudioCallGameProvider>
    </section>
  );
};
