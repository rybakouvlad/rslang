import React from 'react';
import { useAudioGame } from './audio.hook';

export const NextShowButtons: React.FC = () => {
  const { isShowResult, nextIndex, setIsShowResult } = useAudioGame();
  return (
    <div>
      {isShowResult ? (
        <button onClick={nextIndex}>Следущие</button>
      ) : (
        <button
          onClick={() => {
            setIsShowResult(true);
          }}
        >
          Не знаю
        </button>
      )}
    </div>
  );
};
