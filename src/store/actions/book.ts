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

export const changePageAndGroup = (page: number, group: number) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: BookActionsTypes.CHANGE_PAGE_ANG_GROUP,
      payload: {
        page,
        group,
      },
    });
  };
};

export const changeWords = (words: Array<any>) => {
  return (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: BookActionsTypes.CHANGE_WORDS,
      payload: words,
    });
  };
};
