import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AudioCallGame } from './AudioCallGame/AudioCallGame';
import { Settings } from './AppSettings/Settings';
import { Auth } from './Auth/Auth';
import { Dictionary } from './Dictionary/Dictionary';
import { Games } from './Games';
import { Home } from './Home';
import { Book } from './Book/Book';
import { Statistics } from './Statistics/Statistics';

export const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/dictionary">
          <Dictionary />
        </Route>
        <Route path="/audiocall">
          <AudioCallGame />
        </Route>
        <Route path="/stats">
          <Statistics />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </>
  );
};
