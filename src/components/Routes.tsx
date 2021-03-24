import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { Dictionary } from './Dictionary';
import { Games } from './Games';
import { Home } from './Home';
import { Book } from './Book/Book'

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
      </Switch>
    </>
  );
};
