import React, { useEffect, useState } from 'react';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { useTypeSelector } from '../../hooks/useTypesSelector';

export const StatisticGraphs: React.FC = () => {
  const { optional } = useTypeSelector((state) => state.statistic);
  const [everyData, setEveryData] = useState<any>();
  const [label, Setlabel] = useState<any>();

  const [increaseData, setIncreaseData] = useState<any>();

  const getEveryDay = () => {
    const masData: any = [];
    const masLabel: any = [];
    optional.statistic.forEach((el) => masData.push(`${el.date.getDate() + 1}.${el.date.getMonth() + 1}`));

    optional.statistic.forEach((el) => {
      if (el.games.length === 1) {
        masLabel.push(el.games[0].learn);
      } else {
        let sum = 0;
        el.games.forEach((value) => {
          sum += value.learn;
        }),
          masLabel.push(sum);
      }
    });
    setEveryData(masLabel);
    Setlabel(masData);
  };

  const getIncreaseValue = () => {
    let increase = 0;

    const masData: any = [];
    optional.statistic.forEach((el) => {
      if (el.games.length === 1) {
        increase += el.games[0].learn;
        masData.push(increase);
      } else {
        let sum = 0;
        el.games.forEach((value) => {
          sum += value.learn;
        });
        increase += sum;
        masData.push(increase);
      }
    });
    setIncreaseData(masData);
  };
  useEffect(() => {
    getIncreaseValue();
    getEveryDay();
  }, [optional]);

  if (!label) {
    return <h1>Наверное результатов нету</h1>;
  }
  return (
    <div className="statistics-container">
      <BarChart data={everyData} labels={label} />
      <LineChart data={increaseData} labels={label} />
    </div>
  );
};
