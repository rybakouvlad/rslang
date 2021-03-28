import {IUserWords, Setting, UserWordsAction} from "../../types/userWords";

const initialState: IUserWords = {
  wordsSettings: new Map<string, Setting>()
};

export default function (state: IUserWords = initialState, action: UserWordsAction) {
  switch(action.type) {
    case "FETCH_USER_WORDS":
      action.payload.forEach(elem => {
        state.wordsSettings.set(elem.wordId, { 'difficulty': elem.difficulty, optional: elem.optional })
      })
      return {...state};
    case "SET_USER_WORD":
      state.wordsSettings.set(action.payload.wordId, { 'difficulty':action.payload.difficulty, optional:{} })
      return {...state};
    case "UPDATE_USER_WORD":
      state.wordsSettings.get(action.payload.wordId).difficulty = action.payload.difficulty;
      return {...state};
    default:
      return {...state};
  }

}