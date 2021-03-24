import { Dispatch } from 'redux';
import { BookActionsTypes, BookAction } from '../../types/book';

export const nextPage = () => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionsTypes.NEXT_PAGE });
  };
};

export const previousPage = () => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionsTypes.PREVIOUS_PAGE });
  };
};

export const changeGroup = (group: number) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({ type: BookActionsTypes.CHANGE_GROUP, payload: group });
  };
};
