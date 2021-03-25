import { IBook, BookActionsTypes, BookAction } from '../../types/book';

const initialState: IBook = {
  page: 0,
  group: 0,
};

export default function (state: IBook = initialState, action: BookAction): IBook {
  switch (action.type) {
    case BookActionsTypes.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case BookActionsTypes.PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case BookActionsTypes.CHANGE_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    case BookActionsTypes.CHANGE_PAGE_ANG_GROUP:
      return {
        ...state,
        page: action.payload.page,
        group: action.payload.group,
      };
    default:
      return state;
  }
}
