import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeStatistic } from './HomeStatistic';
import { LongStatistic } from './LongStatistic';
import { ShortStatistic } from './ShortStatistic';

export const Statistic: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/statistic">
          <HomeStatistic />
        </Route>
        <Route path="/statistic/long">
          <LongStatistic />
        </Route>
        <Route path="/statistic/short">
          <ShortStatistic />
        </Route>
      </Switch>
    </>
  );
};
