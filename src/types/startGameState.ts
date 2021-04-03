export interface IStatGameState {
  position: string;
}

export enum StartGameStateTypes {
  SET_START_GAME_BOOK = 'SET_START_GAME_BOOK',
  SET_START_GAME_HARD = 'SET_START_GAME_HARD',
  SET_START_GAME_EASY = 'SET_START_GAME_EASY',
  SET_START_GAME_NONE = 'SET_START_GAME_NONE',
}

interface setStartGameBookStateAction {
  type: StartGameStateTypes.SET_START_GAME_BOOK;
}
interface setStartGameHardStateAction {
  type: StartGameStateTypes.SET_START_GAME_HARD;
}
interface setStartGameEasyStateAction {
  type: StartGameStateTypes.SET_START_GAME_EASY;
}
interface setStartGameNoneStateAction {
  type: StartGameStateTypes.SET_START_GAME_NONE;
}

export type SetStartGameStateActions =
  | setStartGameBookStateAction
  | setStartGameHardStateAction
  | setStartGameEasyStateAction
  | setStartGameNoneStateAction;
