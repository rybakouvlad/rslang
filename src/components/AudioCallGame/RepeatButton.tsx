import React from 'react';
import { ReactComponent as RepeatSvg } from '../../assets/svg/Repeat.svg';
import { useAudioGame } from './audio.hook';
export const RepeatButton: React.FC = () => {
  const { playSound } = useAudioGame();
  return (
    <div className="audiocall-repeat-btn" onClick={playSound}>
      <RepeatSvg />
    </div>
  );
};
