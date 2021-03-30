import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTypeSelector } from './useTypesSelector';
import { Word } from '../types/book';
import { testWords } from './testWords';
export interface IContext {
  gameWords: Word[];
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
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);

  const getWords = (): void => {
    console.log(position);

    switch (position) {
      case 'book':
        setWords(words);
        break;
      case 'hard':
        setWords(paginatedResults);
        break;
      case 'easy':
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
  return <CheckPositionContext.Provider value={{ gameWords }}>{children}</CheckPositionContext.Provider>;
};
