export interface IBook {
  page: number;
  group: number;
  words: Array<any>;
}

export enum BookActionsTypes {
  NEXT_PAGE = 'NEXT_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  CHANGE_GROUP = 'CHANGE_GROUP',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_PAGE_ANG_GROUP = 'CHANGE_PAGE_ANG_GROUP',
  CHANGE_WORDS = 'CHANGE_WORDS',
}

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
  payload: Array<any>;
}

export type BookAction = NextPageAction | PreviousPageAction | ChangeGroupAction | ChangePageAndGroup | ChangeWords;
