import React, { useEffect, useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { IDayStat } from '../../types/statistic';
import { ShortAllStatistic } from './ShortAllStatistic';
import { ShortDetailStatistic } from './ShortDetailStatistic';

export const ShortStatistic: React.FC = () => {
  const { optional } = useTypeSelector((state) => state.statistic);
  const date = new Date();
  const [results, setResults] = useState<IDayStat>();

  const checkResult = () => {
    const data = optional.statistic.find(
      (el) =>
        el.date.getFullYear() === date.getFullYear() &&
        el.date.getMonth() === date.getMonth() &&
        el.date.getDay() === date.getDay(),
    );

    if (data) {
      setResults(data);
    }
  };

  useEffect(() => {
    checkResult();
  }, [optional]);

  if (!results) {
    return <h1>Данных нету</h1>;
  }
  return (
    <div className="dictionary-container">
      <h1 className="dictionary-header" style={{ color: '#FC983A' }}>
        Краткосрочная статистика
      </h1>
      <ShortAllStatistic results={results} />
      <ShortDetailStatistic results={results} />
    </div>
  );
};
