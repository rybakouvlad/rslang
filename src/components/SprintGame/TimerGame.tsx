import React, { useEffect } from 'react';
import { SVGCircle } from './SVGCircle';
import { useSprintGame } from 'Components/SprintGame/sprintGame.hook';

export const TimerGame: React.FC = () => {
  // const [timer, setTimer] = useState(60);
  const { timer, setTimer } = useSprintGame();

  function mapNumber(number: number, in_min: number, in_max: number, out_min: number, out_max: number) {
    return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
  const secondsRadius = mapNumber(60 - timer, 60, 0, 0, 360);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (timer) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  });
  return (
    <div>
      <div className="sprint-timer">
        <SVGCircle radius={secondsRadius} />
        <span>{timer}</span>
      </div>
    </div>
  );
};
