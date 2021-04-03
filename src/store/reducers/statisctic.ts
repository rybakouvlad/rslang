import { IGameAllStatic, SetGameStatisticActions, GamesStatisticTypes } from '../../types/statistic';

const initialState: IGameAllStatic = {
  optional: {
    statistic: [],
  },
  learnedWords: 0,
  loading: false,
};

export default (state: IGameAllStatic = initialState, action: SetGameStatisticActions) => {
  switch (action.type) {
    case GamesStatisticTypes.SET_GAME_STATISTIC:
      return { ...action.payload };

    default:
      return { ...state };
  }
};
