export interface IUserWords {
  wordsSettings: Map<string, Setting>;
}

export type Setting = {
  difficulty: string;
  optional: any;
};
export interface ISetting {
  difficulty: string;
  id?: string;
  wordId: string;
}
export enum UserWordsActionsTypes {
  FETCH_USER_WORDS = 'FETCH_USER_WORDS',
  SET_USER_WORD = 'SET_USER_WORD',
  UPDATE_USER_WORD = 'UPDATE_USER_WORD',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
}

interface FetchUserWords {
  type: UserWordsActionsTypes.FETCH_USER_WORDS;
  payload: Array<ISetting>;
}
interface SetUserWord {
  type: UserWordsActionsTypes.SET_USER_WORD;
  payload: ISetting;
}
interface UpdateUserWord {
  type: UserWordsActionsTypes.UPDATE_USER_WORD;
  payload: ISetting;
}
interface DeleteUserWord {
  type: UserWordsActionsTypes.DELETE_USER_WORD;
  payload: string;
}

export type UserWordsAction = FetchUserWords | SetUserWord | UpdateUserWord | DeleteUserWord;
