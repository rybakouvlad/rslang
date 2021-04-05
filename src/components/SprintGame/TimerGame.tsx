import React, { useEffect, useState } from 'react';
import { SVGCircle } from './SVGCircle';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';

export const TimerGame: React.FC = () => {
  const [timer, setTimer] = useState(60);
  const { setIsTimer } = useSprintGame();

  function mapNumber(number: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
  const secondsRadius = mapNumber(60 - timer, 60, 0, 0, 360);
  useEffect(() => {
    let flag = 0;
    const interval = setInterval(() => {
      if (flag !== 60) {
        setTimer((timer) => timer - 1);
        flag++;
      } else {
        setIsTimer(false);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <div className="sprint-timer">
        <SVGCircle radius={secondsRadius} />
        <span>{timer}</span>
      </div>
    </div>
  );
};
