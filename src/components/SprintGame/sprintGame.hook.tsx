import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import correct from '../../assets/sounds/correct.mp3';
import wrong from '../../assets/sounds/wrong.mp3';

interface IContext {
  isPlaySound: boolean;
  setIsPlaySound: Dispatch<SetStateAction<boolean>>;
  isTimer: boolean;
  setIsTimer: Dispatch<SetStateAction<boolean>>;
  // timer: number;
  // setTimer: Dispatch<SetStateAction<number>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  playSound(type: 'correct' | 'wrong'): void;
}

interface IProps {
  children: React.ReactNode;
}

const SprintGameContext = createContext<IContext>(null);

export const useSprintGame = () => {
  return useContext(SprintGameContext);
};

export const SprintGameProvider: React.FC = ({ children }: IProps) => {
  const [isPlaySound, setIsPlaySound] = useState(true);
  const [isTimer, setIsTimer] = useState(true);
  // const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const playSound = (type: 'correct' | 'wrong'): void => {
    if (type === 'correct') {
      new Audio(correct).play();
    } else {
      new Audio(wrong).play();
    }
  };
  return (
    <SprintGameContext.Provider
      value={{
        isPlaySound,
        setIsPlaySound,
        isTimer,
        setIsTimer,
        // timer,
        // setTimer,
        score,
        setScore,
        isFullScreen,
        setIsFullScreen,
        playSound,
      }}
    >
      {children}
    </SprintGameContext.Provider>
  );
};
