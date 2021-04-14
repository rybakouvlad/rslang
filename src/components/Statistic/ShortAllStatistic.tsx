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
    let sumLearn = 0;
    props.results.games.forEach((el) => {
      sumLearn += el.learn;
    });

    let correct = 0;
    props.results.games.forEach((el) => {
      correct += el.correct;
    });

    let incorrect = 0;
    props.results.games.forEach((el) => {
      incorrect += el.incorrect;
    });

    setLearnWords(+sumLearn);
    setPerCent(Math.trunc((+correct / (+correct + +incorrect)) * 100));
  };

  useEffect(() => {
    setStatisticData();
  }, [props]);
  return (
    <>
      <h2>Сегодня изучено: {learnWords}</h2>
      <h2>Процент правильных: {perCent}%</h2>
    </>
  );
};
