interface IGameStat {
  name: string;
  correct: number;
  incorrect: number;
  series: number;
  learn: number;
}

export interface IDayStat {
  date: Date;
  games: IGameStat[];
}

export interface IGameAllStatic {
  learnedWords: number;
  optional: {
    statistic: IDayStat[];
  };
  loading?: boolean;
}

export enum GamesStatisticTypes {
  SET_GAME_STATISTIC = 'SET_GAME_STATISTIC',
  SET_GAME_STATISTIC_LOADING = 'SET_GAME_STATISTIC_LOADING',
  SET_GAME_STATISTIC_SUCCESS = 'SET_GAME_STATISTIC_SUCCESS',
  SET_GAME_STATISTIC_ERROR = 'SET_GAME_STATISTIC_ERROR',
}

interface setGameStatisticCorrectAction {
  type: GamesStatisticTypes.SET_GAME_STATISTIC;
  payload: IGameAllStatic;
}

interface setGameStatisticLoadingAction {
  type: GamesStatisticTypes.SET_GAME_STATISTIC_LOADING;
}
interface setGameStatisticSuccesesAction {
  type: GamesStatisticTypes.SET_GAME_STATISTIC_SUCCESS;
}
interface setGameStatisticErrorAction {
  type: GamesStatisticTypes.SET_GAME_STATISTIC_ERROR;
}

export type SetGameStatisticActions =
  | setGameStatisticCorrectAction
  | setGameStatisticLoadingAction
  | setGameStatisticSuccesesAction
  | setGameStatisticErrorAction;
