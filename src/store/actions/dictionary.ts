import { Dispatch } from 'redux';
import { DictionaryActionsTypes, DictionaryAction } from '../../types/dictionary';

export const nextPage = () => {
  return (dispatch: Dispatch<DictionaryAction>) => {
    dispatch({ type: DictionaryActionsTypes.NEXT_PAGE });
  };
};

export const previousPage = () => {
  return (dispatch: Dispatch<DictionaryAction>) => {
    dispatch({ type: DictionaryActionsTypes.PREVIOUS_PAGE });
  };
};

export const changePageByBumber = (page: number) => {
  return (dispatch: Dispatch<DictionaryAction>) => {
    dispatch({
      type: DictionaryActionsTypes.CHANGE_PAGE_BY_NUMBER,
      payload: page,
    });
  };
};
