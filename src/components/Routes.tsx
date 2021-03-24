import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AudioCallGame } from './AudioCallGame/AudioCallGame';
import { Auth } from './Auth/Auth';
import { Dictionary } from './Dictionary';
import { Games } from './Games';
import { Home } from './Home';

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
        <Route path="/dictionary">
          <Dictionary />
        </Route>
        <Route path="/audiocall">
          <AudioCallGame />
        </Route>
      </Switch>
    </>
  );
};
