import React, { useEffect, useState } from 'react';
import {SVGCircle} from "./SVGCircle";

export const TimerGame: React.FC = () => {
  const [timer, setTimer] = useState(60);

  function mapNumber(number:number, in_min:number, in_max:number, out_min:number, out_max:number) {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
  const secondsRadius = mapNumber(60-timer, 60, 0, 0, 360);
  useEffect(() => {
    const interval = setTimeout(() => {
      if(timer) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  });
  return (
    <div>
      <div>  <SVGCircle radius={secondsRadius}/>
        {timer}
      </div>
    </div>
  );
};
