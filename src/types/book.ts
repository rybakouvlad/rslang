export interface IBook {
  page: number;
  group: number;
}

export enum BookActionsTypes {
  NEXT_PAGE = 'NEXT_PAGE',
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  CHANGE_GROUP = 'CHANGE_GROUP',
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

export type BookAction = NextPageAction | PreviousPageAction | ChangeGroupAction;
