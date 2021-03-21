import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Auth } from './Auth';
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
      </Switch>
    </>
  );
};
