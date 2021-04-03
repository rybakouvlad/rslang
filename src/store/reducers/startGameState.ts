import { IStatGameState, SetStartGameStateActions, StartGameStateTypes } from '../../types/startGameState';

const initialState: IStatGameState = {
  position: null,
};

export default function (state: IStatGameState = initialState, action: SetStartGameStateActions): IStatGameState {
  switch (action.type) {
    case StartGameStateTypes.SET_START_GAME_BOOK:
      return { ...state, position: 'book' };
    case StartGameStateTypes.SET_START_GAME_HARD:
      return { ...state, position: 'hard' };
    case StartGameStateTypes.SET_START_GAME_EASY:
      return { ...state, position: 'learn' };
    case StartGameStateTypes.SET_START_GAME_NONE:
      return { ...state, position: null };
    default:
      return { ...state };
  }
}
