export interface IUserWords {
  wordsSettings: Map<string, IUserWordSetting>;
}

export interface iOptional {
  correct?: number;
  incorrect?: number;
}

export interface IUserWordSetting {
  difficulty: string;
  optional?: iOptional;
}
export interface IFetchSetting extends IUserWordSetting {
  // setting: IUserWordSetting;
  id?: string;
  wordId: string;
}
export enum UserWordsActionsTypes {
  FETCH_USER_WORDS = 'FETCH_USER_WORDS',
  SET_USER_WORD = 'SET_USER_WORD',
  UPDATE_DIFFICULTY_WORD = 'UPDATE_DIFFICULTY_WORD',
  UPDATE_OPTIONS_WORD = 'UPDATE_OPTIONS_WORD',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
}

interface FetchUserWords {
  type: UserWordsActionsTypes.FETCH_USER_WORDS;
  payload: Array<IFetchSetting>;
}
interface SetUserWord {
  type: UserWordsActionsTypes.SET_USER_WORD;
  payload: IFetchSetting;
}
interface UpdateUserDifficultyWord {
  type: UserWordsActionsTypes.UPDATE_DIFFICULTY_WORD;
  payload: {
    difficulty: string;
    wordId: string;
  };
}
interface UpdateUserOptionsWord {
  type: UserWordsActionsTypes.UPDATE_OPTIONS_WORD;
  payload: {
    difficulty: string;
    WorrdId: string;
  };
}

interface DeleteUserWord {
  type: UserWordsActionsTypes.DELETE_USER_WORD;
  payload: string;
}

export type UserWordsAction =
  | FetchUserWords
  | SetUserWord
  | UpdateUserOptionsWord
  | DeleteUserWord
  | UpdateUserDifficultyWord;
