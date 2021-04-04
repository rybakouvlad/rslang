import React, { useEffect, useState } from 'react';
import { IDayStat } from '../../types/statistic';

interface IProps {
  results: IDayStat;
}
export const ShortAllStatistic: React.FC<IProps> = (props: IProps) => {
  const [learnWords, setLearnWords] = useState(0);
  const [perCent, setPerCent] = useState(0);

  const setStatisticData = () => {
    if (props.results.games.length === 1) {
      setLearnWords(props.results.games[0].learn);
      setPerCent(
        Math.trunc(
          (props.results.games[0].correct / (props.results.games[0].correct + +props.results.games[0].incorrect)) * 100,
        ),
      );
      return;
    }
    const sumLearn = props.results.games.reduce((sum, value: any) => {
      return sum.learn + value.learn;
    });
    const correct = props.results.games.reduce((sum, value: any) => {
      return sum.correct + value.correct;
    });
    const incorrect = props.results.games.reduce((sum, value: any) => {
      return sum.incorrect + value.incorrect;
    });

    setLearnWords(+sumLearn);
    setPerCent(Math.trunc((+correct / (+correct + +incorrect)) * 100));
  };

  useEffect(() => {
    setStatisticData();
  }, []);
  return (
    <>
      <h2>Сегодня изучено: {learnWords}</h2>
      <h2>Процент правильных: {perCent}%</h2>
    </>
  );
};
