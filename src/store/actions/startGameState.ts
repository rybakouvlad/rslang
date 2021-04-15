import { Dispatch } from 'redux';
import { SetStartGameStateActions, StartGameStateTypes } from '../../types/startGameState';

export const setStartGameStateBook = () => {
  return (dispatch: Dispatch<SetStartGameStateActions>) => {
    dispatch({ type: StartGameStateTypes.SET_START_GAME_BOOK });
  };
};

export const setStartGameStateHard = () => {
  return (dispatch: Dispatch<SetStartGameStateActions>) => {
    dispatch({ type: StartGameStateTypes.SET_START_GAME_HARD });
  };
};

export const setStartGameStateEasy = () => {
  return (dispatch: Dispatch<SetStartGameStateActions>) => {
    dispatch({ type: StartGameStateTypes.SET_START_GAME_EASY });
  };
};
export const setStartGameStateNone = () => {
  return (dispatch: Dispatch<SetStartGameStateActions>) => {
    dispatch({ type: StartGameStateTypes.SET_START_GAME_NONE });
  };
};
