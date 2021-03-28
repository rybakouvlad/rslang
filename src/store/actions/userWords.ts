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
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};

export const SetUserWord = (wordId: string, difficulty: string, userId: string, userToken: string) => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  console.log(userId);
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words/${wordId}`, {
        method: 'POST',
        body: JSON.stringify({ difficulty: difficulty, optional: {} }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({ type: UserWordsActionsTypes.SET_USER_WORD, payload: { wordId, difficulty } });
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};

export const UpdateUserWord = (wordId: string, difficulty: string, userId: string, userToken: string) => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  console.log(userId);
  return async (dispatch: Dispatch<UserWordsAction>) => {
    try {
      await fetch(`https://server-team19-rsschool.herokuapp.com/users/${userID}/words/${wordId}`, {
        method: 'PUT',
        body: JSON.stringify({ difficulty: difficulty, optional: {} }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch({ type: UserWordsActionsTypes.UPDATE_USER_WORD, payload: { wordId, difficulty } });
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};

export const DeleteUserWord = (wordId: string, userId: string, userToken: string) => {
  const userID = JSON.parse(localStorage.getItem('userData')).userId;
  console.log(userId);
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
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};
