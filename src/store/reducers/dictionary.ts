import { IDictionary, DictionaryActionsTypes, DictionaryAction } from '../../types/dictionary';

const initialState: IDictionary = {
  page: 0,
  numberOfWordsOnPage: 20,
};

export default function (state: IDictionary = initialState, action: DictionaryAction): IDictionary {
  switch (action.type) {
    case DictionaryActionsTypes.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case DictionaryActionsTypes.PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case DictionaryActionsTypes.CHANGE_PAGE_BY_NUMBER:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
