import { Dispatch } from 'redux';
import { UserWordsAction, UserWordsActionsTypes } from '../../types/userWords';

export const FetchUserWords = () => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  const userToken = JSON.parse(localStorage.getItem('userData')).token;

  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      const data = await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const result = await data.json();
      dispatch({ type: UserWordsActionsTypes.FETCH_USER_WORDS, payload: result });
    } catch (error) {}
  };
};

export const SetUserWord = (
  wordId: string,
  difficulty: string,
  userID = JSON.parse(localStorage.getItem('userData')).userId,
  userToken: string,
  correct = 0,
  incorrect = 0,
) => {
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words/${wordId}`, {
        method: 'POST',
        body: JSON.stringify({ difficulty: difficulty, optional: { correct: correct, incorrect: incorrect } }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({ type: UserWordsActionsTypes.SET_USER_WORD, payload: { wordId, difficulty: difficulty } });
    } catch (error) {}
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const UpdateUserWord = (
  wordId: string,
  difficulty = '',
  userId: string,
  userToken: string,
  correct = 0,
  incorrect = 0,
) => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  let body: string = null;
  if (difficulty) {
    body = JSON.stringify({ difficulty: difficulty });
  } else if (correct || incorrect) {
    body = JSON.stringify({ optional: { correct: correct, incorrect: incorrect } });
  }

  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words/${wordId}`, {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({
        type: UserWordsActionsTypes.UPDATE_DIFFICULTY_WORD,
        payload: { wordId: wordId, difficulty: difficulty },
      });
    } catch (error) {}
  };
};

export const DeleteUserWord = (wordId: string, userId: string, userToken: string) => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      dispatch({ type: UserWordsActionsTypes.DELETE_USER_WORD, payload: wordId });
    } catch (error) {}
  };
};
