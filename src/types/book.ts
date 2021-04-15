export interface IBook {
  page: number;
  group: number;
  words: Array<Word>;
}

export enum BookActionsTypes {
  NEXT_PAGE = 'NEXT_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  CHANGE_GROUP = 'CHANGE_GROUP',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_PAGE_ANG_GROUP = 'CHANGE_PAGE_ANG_GROUP',
  CHANGE_WORDS = 'CHANGE_WORDS',
  CHANGE_PAGE_BY_NUMBER = 'CHANGE_PAGE_BY_NUMBER',
}

export type Word = {
  id: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
};

interface NextPageAction {
  type: BookActionsTypes.NEXT_PAGE;
}

interface PreviousPageAction {
  type: BookActionsTypes.PREVIOUS_PAGE;
}

interface ChangeGroupAction {
  type: BookActionsTypes.CHANGE_GROUP;
  payload: number;
}

interface ChangePageAndGroup {
  type: BookActionsTypes.CHANGE_PAGE_ANG_GROUP;
  payload: {
    page: number;
    group: number;
  };
}

interface ChangeWords {
  type: BookActionsTypes.CHANGE_WORDS;
  payload: Array<Word>;
}

interface ChangePageByNumber {
  type: BookActionsTypes.CHANGE_PAGE_BY_NUMBER;
  payload: number;
}

export type BookAction =
  | NextPageAction
  | PreviousPageAction
  | ChangeGroupAction
  | ChangePageAndGroup
  | ChangeWords
  | ChangePageByNumber;
