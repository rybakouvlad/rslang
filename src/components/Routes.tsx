import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AudioCallGame } from './AudioCallGame/AudioCallGame';
import { Settings } from './AppSettings/Settings';
import { Auth } from './Auth/Auth';
import { Dictionary } from './Dictionary/Dictionary';
import { Games } from './Games';
import { Home } from './Home';
import { Book } from './Book/Book';
import { OurGameProvider } from './OurGeme/OurGameProvider';
import Savannah from '../components/SavannahGame/SavannahFN';
import { SprintGameWrapper } from './SprintGame/SprintGameWrapper';
import { AboutTeam } from './AboutTeam/AboutTeam';
import { Statistic } from './Statistic/Statistic';

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
        <Route path="/sprint">
          <SprintGameWrapper />
        </Route>
        <Route path="/statistic">
          <Statistic />
        </Route>
        <Route path="/audiocall">
          <AudioCallGame />
        </Route>
        <Route path="/our-game">
          <OurGameProvider />
        </Route>
        <Route path="/savana">
          <Savannah />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/team">
          <AboutTeam />
        </Route>
      </Switch>
    </>
  );
};
