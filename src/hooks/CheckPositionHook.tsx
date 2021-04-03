import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTypeSelector } from './useTypesSelector';
import { Word } from '../types/book';
import { useDispatch } from 'react-redux';
import { SetUserWord, UpdateUserWord } from '../store/actions/userWords';
import { useQuery } from './useQuery';
import { useSetWordsState } from './useGetBookWords';
import { getRandomInt } from '../utils/getRandomInt';
export interface IContext {
  gameWords: Word[];
  checkWords(word: Word, result: boolean): void;
  getPosition(): string;
  changeDifficulty(value: string): void;
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
  const { words } = useTypeSelector((state) => state.book);
  const { userID, token } = useTypeSelector((state) => state.auth);
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  const { setFetch, bookRandomWord } = useSetWordsState();
  const [lastPage, setLastPage] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();

  const changeDifficulty = (value: string) => {
    const page = getRandomInt(0, 30);
    setLastPage(page);
    console.log(lastPage);
    setFetch(Number(value), page);
  };

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

  const getPosition = (): string => {
    switch (query.get('path')) {
      case 'book':
        return 'из учебника';
      case 'hard':
        return 'из "сложного" словаря';
      case 'learn':
        return 'из "изучаемого" словаря';
      default:
        return null;
    }
  };

  const getWords = (): void => {
    switch (query.get('path')) {
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
        setWords(bookRandomWord);
        break;
    }
  };

  useEffect(() => {
    getWords();
  }, [bookRandomWord]);
  return (
    <CheckPositionContext.Provider value={{ gameWords, checkWords, getPosition, changeDifficulty }}>
      {children}
    </CheckPositionContext.Provider>
  );
};
