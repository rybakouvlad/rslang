import React, { useEffect, useState } from 'react';
import { IDayStat, IGameStat } from '../../types/statistic';
import { StatisticSelector } from './statisticSelector';

interface IProps {
  results: IDayStat;
}

export const ShortDetailStatistic: React.FC<IProps> = (props: IProps) => {
  const [gameName, setGameName] = useState<string>('audiocall');
  const [gameResult, setGameResult] = useState<IGameStat>();
  useEffect(() => {
    const data = props.results.games.find((el) => {
      return el.name === gameName;
    });
    setGameResult(data);
  }, [gameName, gameResult]);
  // if (!gameResult) {
  //   return <h1>Данных сегодня нету</h1>;
  // }
  return (
    <div className="game-statistics">
      <StatisticSelector setGameName={setGameName} />
      {gameResult ? (
        <ul className="short-statistics-games">
          <li>Новых слов изучено {gameResult.learn}</li>
          <li>
            Процент правильных {Math.trunc((gameResult.correct / (gameResult.correct + gameResult.incorrect)) * 100)}%
          </li>
          <li>Самая длинная сери {gameResult.series}</li>
        </ul>
      ) : (
        <span className="statistics-error">Данных сегодня нету</span>
      )}
    </div>
  );
};
