import { IUserWords, IUserWordSetting, UserWordsAction, UserWordsActionsTypes } from '../../types/userWords';

const initialState: IUserWords = {
  wordsSettings: new Map<string, IUserWordSetting>(),
};

export default function (state: IUserWords = initialState, action: UserWordsAction) {
  switch (action.type) {
    case 'FETCH_USER_WORDS':
      action.payload.forEach((elem) => {
        state.wordsSettings.set(elem.wordId, { difficulty: elem.difficulty, optional: elem.optional });
      });
      return { ...state };
    case 'SET_USER_WORD':
      state.wordsSettings.set(action.payload.wordId, {
        difficulty: action.payload.difficulty,
        optional: { correct: 0, incorrect: 0 },
      });
      return { ...state };
    case UserWordsActionsTypes.UPDATE_DIFFICULTY_WORD:
      state.wordsSettings.get(action.payload.wordId).difficulty = action.payload.difficulty;
      return { ...state };
    case 'DELETE_USER_WORD':
      state.wordsSettings.delete(action.payload);
      return { ...state };
    default:
      return { ...state };
  }
}
