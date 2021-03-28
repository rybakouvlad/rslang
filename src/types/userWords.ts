
export interface IUserWords {
  wordsSettings: Map<string, Setting>
}

export type Setting = {
  difficulty: string,
  optional: object
}
// export interface ISetting {
//   wordsSettings: Map<string, Setting>
// }
export enum UserWordsActionsTypes {
  FETCH_USER_WORDS = 'FETCH_USER_WORDS',
  SET_USER_WORD = 'SET_USER_WORD',
  UPDATE_USER_WORD = 'UPDATE_USER_WORD'
}

interface FetchUserWords {
  type: UserWordsActionsTypes.FETCH_USER_WORDS;
  payload: any[];
}

interface SetUserWord {
  type: UserWordsActionsTypes.SET_USER_WORD;
  payload: any;
}
interface UpdateUserWord {
  type: UserWordsActionsTypes.UPDATE_USER_WORD;
  payload: any;
}


export type UserWordsAction =
  | FetchUserWords
  | SetUserWord
  | UpdateUserWord;
