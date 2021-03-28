import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DictionaryHome } from './DictionaryHome';
import { DictionaryLearn } from './DictionaryLearn';
import { DictionaryHard } from './DictionaryHard';
import { DictionaryDeleted } from './DictionaryDeleted';

export const Dictionary: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dictionary">
          <DictionaryHome />
        </Route>
        <Route path="/dictionary/learn">
          <DictionaryLearn />
        </Route>
        <Route path="/dictionary/hard">
          <DictionaryHard />
        </Route>
        <Route path="/dictionary/deleted">
          <DictionaryDeleted />
        </Route>
      </Switch>
    </>
  );
};
