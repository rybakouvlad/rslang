import React from 'react';
import {TimerGame} from './TimerGame';
import {Score} from './Score';
function getRandomInt(max:number) {
  return Math.floor(Math.random() * Math.floor(max));
}
const words = [['yes', 'да'], ['no', 'нет'], ['wool', 'шерсть'], ['yellow', 'жёлтый'], ['red', 'красный'], ['blue', 'голубой'], ['black', 'чёрный'], ['green', 'зелёный'], ['usually', 'обычно'], ['be', 'быть']];
export const Game: React.FC = () => {

  return (
    <div>
      <TimerGame/>
      <Score/>
      <div>
        <div className="sprint-card-header">ff</div>
        <div className="sprint-card-body">ff</div>
        <div className="sprint-card-footer">
          <button>да</button>
          <button>нет</button>
        </div>
      </div>
    </div>
  );
};
