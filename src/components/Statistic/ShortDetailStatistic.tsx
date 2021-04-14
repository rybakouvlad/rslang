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
  }, [gameName]);
  if (!gameResult) {
    return <h1>Данных сегодня нету</h1>;
  }
  return (
    <>
      <StatisticSelector setGameName={setGameName} />
      <div>Новых слов изучено {gameResult.learn}</div>
      <div>
        Процент правильных {Math.trunc((gameResult.correct / (gameResult.correct + gameResult.incorrect)) * 100)}%
      </div>
      <div>Самая длинная сери {gameResult.series}</div>
    </>
  );
};
