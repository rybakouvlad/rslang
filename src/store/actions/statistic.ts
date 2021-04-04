import { Dispatch } from 'redux';
import { GamesStatisticTypes, SetGameStatisticActions, IGameAllStatic, IDayStat } from '../../types/statistic';

export const staticAddCorrect = (statistic: IGameAllStatic, name: string, userID: string, token: string) => {
  return {
    type: GamesStatisticTypes.SET_GAME_STATISTIC,
    payload: statistic,
  };
};

export const statisticSetCorrect = (userID: string, token: string, statistic: IGameAllStatic, name: string) => {
  let result = checkData(statistic);
  result = checkGame(result, name);
  const date = new Date();

  result.optional.statistic.find((el: IDayStat) => {
    if (
      el.date.getFullYear() === date.getFullYear() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getDay() === date.getDay()
    ) {
      el.games.find((element) => {
        if (element.name === name) {
          element.correct = element.correct + 1;
          return true;
        } else return false;
      });
    }
  });
  return async (dispatch: Dispatch<SetGameStatisticActions>) => {
    dispatch({ type: GamesStatisticTypes.SET_GAME_STATISTIC_LOADING });
    try {
      postStatistic(userID, token, result)
        .then((data) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC,
            payload: result,
          });
        })
        .catch((error) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC_ERROR,
            payload: 'Авторизация неудалась, проверьте почту или пароль',
          });
        });
    } catch (error) {}
  };
};

export const statisticSetIncorrect = (userID: string, token: string, statistic: IGameAllStatic, name: string) => {
  let result = checkData(statistic);
  result = checkGame(result, name);
  const date = new Date();

  result.optional.statistic.find((el: IDayStat) => {
    if (
      el.date.getFullYear() === date.getFullYear() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getDay() === date.getDay()
    ) {
      el.games.find((element) => {
        if (element.name === name) {
          element.incorrect = element.incorrect + 1;
          return true;
        } else return false;
      });
    }
  });
  return async (dispatch: Dispatch<SetGameStatisticActions>) => {
    dispatch({ type: GamesStatisticTypes.SET_GAME_STATISTIC_LOADING });
    try {
      postStatistic(userID, token, result)
        .then((data) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC,
            payload: result,
          });
        })
        .catch((error) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC_ERROR,
            payload: 'Авторизация неудалась, проверьте почту или пароль',
          });
        });
    } catch (error) {}
  };
};

export const statisticSetLern = (userID: string, token: string, statistic: IGameAllStatic, name: string) => {
  let result = checkData(statistic);
  result = checkGame(result, name);
  const date = new Date();

  result.optional.statistic.find((el: IDayStat) => {
    if (
      el.date.getFullYear() === date.getFullYear() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getDay() === date.getDay()
    ) {
      el.games.find((element) => {
        if (element.name === name) {
          element.learn = element.learn + 1;
          return true;
        } else return false;
      });
    }
  });
  return async (dispatch: Dispatch<SetGameStatisticActions>) => {
    dispatch({ type: GamesStatisticTypes.SET_GAME_STATISTIC_LOADING });
    try {
      postStatistic(userID, token, result)
        .then((data) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC,
            payload: result,
          });
        })
        .catch((error) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC_ERROR,
            payload: 'Авторизация неудалась, проверьте почту или пароль',
          });
        });
    } catch (error) {}
  };
};

export const statisticSetSeries = (
  userID: string,
  token: string,
  statistic: IGameAllStatic,
  name: string,
  series: number,
) => {
  let result = checkData(statistic);
  result = checkGame(result, name);
  const date = new Date();

  result.optional.statistic.find((el: IDayStat) => {
    if (
      el.date.getFullYear() === date.getFullYear() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getDay() === date.getDay()
    ) {
      el.games.find((element) => {
        if (element.name === name) {
          element.series = series;
          return true;
        } else return false;
      });
    }
  });
  return async (dispatch: Dispatch<SetGameStatisticActions>) => {
    dispatch({ type: GamesStatisticTypes.SET_GAME_STATISTIC_LOADING });
    try {
      postStatistic(userID, token, result)
        .then((data) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC,
            payload: result,
          });
        })
        .catch((error) => {
          dispatch({
            type: GamesStatisticTypes.SET_GAME_STATISTIC_ERROR,
            payload: 'Авторизация неудалась, проверьте почту или пароль',
          });
        });
    } catch (error) {}
  };
};

const postStatistic = async (userID: string, token: string, statistic: IGameAllStatic) => {
  try {
    const data = await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/statistics`, {
      method: 'PUT',
      body: JSON.stringify({
        learnedWords: statistic.learnedWords,
        optional: { statistic: JSON.stringify(statistic.optional.statistic) },
      }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await data.json();
    return result;
  } catch (error) {
    return;
  }
};

export const getAllStatistic = (userID: string, token: string) => {
  return async (dispatch: Dispatch<SetGameStatisticActions>) => {
    try {
      const data = await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/statistics`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await data.json();
      result.optional.statistic = JSON.parse(result.optional.statistic);
      if (result.optional.statistic) {
        result.optional.statistic.forEach((el: IDayStat) => (el.date = new Date(el.date)));
      }
      dispatch({
        type: GamesStatisticTypes.SET_GAME_STATISTIC,
        payload: result,
      });
      return result;
    } catch (error) {}
  };
};

const checkData = (statistic: IGameAllStatic) => {
  const date = new Date();

  if (
    statistic.optional.statistic.some(
      (el: IDayStat) =>
        el.date.getFullYear() === date.getFullYear() &&
        el.date.getMonth() === date.getMonth() &&
        el.date.getDay() === date.getDay(),
    )
  ) {
    return statistic;
  } else {
    const result = statistic;
    result.optional.statistic.push({
      date: new Date(),
      games: [],
    });
    return result;
  }
};

const checkGame = (statistic: IGameAllStatic, name: string) => {
  const date = new Date();

  if (
    statistic.optional.statistic.some(
      (el: IDayStat) =>
        el.date.getFullYear() === date.getFullYear() &&
        el.date.getMonth() === date.getMonth() &&
        el.date.getDay() === date.getDay() &&
        el.games.some((element) => {
          return element.name === name;
        }),
    )
  ) {
    return statistic;
  } else {
    const result = statistic;
    result.optional.statistic.find((el: IDayStat) => {
      if (
        el.date.getFullYear() === date.getFullYear() &&
        el.date.getMonth() === date.getMonth() &&
        el.date.getDay() === date.getDay()
      ) {
        el.games.push({
          name: name,
          correct: 0,
          incorrect: 0,
          series: 0,
          learn: 0,
        });
        return true;
      } else return false;
    });
    return result;
  }
};
