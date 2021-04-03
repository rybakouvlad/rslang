import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTypeSelector } from './useTypesSelector';
import { Word } from '../types/book';
import { testWords } from './testWords';
import { useDispatch } from 'react-redux';
import { SetUserWord, UpdateUserWord } from '../store/actions/userWords';
export interface IContext {
  gameWords: Word[];
  checkWords(word: Word, result: boolean): void;
}

interface IProps {
  children: React.ReactNode;
}

const CheckPositionContext = createContext<IContext>(null);

export const useCheckPosition = () => {
  return useContext(CheckPositionContext);
};

export const CheckPositionProvider: React.FC = ({ children }: IProps) => {
  const [gameWords, setWords] = useState<Word[]>([]);
  const { position } = useTypeSelector((state) => state.setStartGameState);
  const { words } = useTypeSelector((state) => state.book);
  const { userID, token } = useTypeSelector((state) => state.auth);
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  const dispatch = useDispatch();

  const checkWords = (word: Word, result: boolean): void => {
    if (wordsSettings.has(word.id)) {
      if (result) {
        dispatch(
          UpdateUserWord(
            word.id,
            null,
            userID,
            token,
            wordsSettings.get(word.id).optional.correct + 1,
            wordsSettings.get(word.id).optional.incorrect,
          ),
        );
      } else {
        dispatch(
          UpdateUserWord(
            word.id,
            null,
            userID,
            token,
            wordsSettings.get(word.id).optional.correct,
            wordsSettings.get(word.id).optional.incorrect + 1,
          ),
        );
      }
    } else {
      if (result) {
        dispatch(SetUserWord(word.id, 'learn', userID, token, 1));
      } else {
        dispatch(SetUserWord(word.id, 'learn', userID, token, 0, 1));
      }
    }
  };

  const getWords = (): void => {
    console.log(position);

    switch (position) {
      case 'book':
        setWords(words);
        break;
      case 'hard':
        setWords(paginatedResults);
        break;
      case 'learn':
        setWords(paginatedResults);
        break;
      default:
        setWords(testWords);
        break;
    }
  };

  useEffect(() => {
    getWords();
  }, []);
  return <CheckPositionContext.Provider value={{ gameWords, checkWords }}>{children}</CheckPositionContext.Provider>;
};
