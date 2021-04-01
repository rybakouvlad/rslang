export interface IDictionary {
  page: number;
  numberOfWordsOnPage: number;
}

export enum DictionaryActionsTypes {
  NEXT_PAGE = 'NEXT_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  CHANGE_PAGE_BY_NUMBER = 'CHANGE_PAGE_BY_NUMBER',
}

interface NextPageAction {
  type: DictionaryActionsTypes.NEXT_PAGE;
}

interface PreviousPageAction {
  type: DictionaryActionsTypes.PREVIOUS_PAGE;
}

interface ChangePageByNumber {
  type: DictionaryActionsTypes.CHANGE_PAGE_BY_NUMBER;
  payload: number;
}

export type DictionaryAction = NextPageAction | PreviousPageAction | ChangePageByNumber;
