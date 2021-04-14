import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTypeSelector } from './useTypesSelector';
import { Word } from '../types/book';
import { useDispatch } from 'react-redux';
import { SetUserWord, UpdateUserWord } from '../store/actions/userWords';
import { useQuery } from './useQuery';
import { useSetWordsState } from './useGetBookWords';
import { getRandomInt } from '../utils/getRandomInt';
import { getAggregatedWords, getAggregateLearndWords } from '../store/actions/aggregatedWords';

import {
  statisticSetCorrect,
  statisticSetIncorrect,
  statisticSetLern,
  statisticSetSeries,
} from '../store/actions/statistic';
import { useLocation } from 'react-router-dom';

export interface IContext {
  gameWords: Word[];

  checkWords(word: Word, result: boolean): void;

  getPosition(): string;

  changeDifficulty(value: string): void;

  getPrevPageWords(): boolean;
}

interface IProps {
  children: React.ReactNode;
}

const CheckPositionContext = createContext<IContext>(null);

export const useCheckPosition = () => {
  return useContext(CheckPositionContext);
};

export const CheckPositionProvider: React.FC = ({ children }: IProps) => {
  const query = useQuery();
  const [gameWords, setWords] = useState<Word[]>([]);
  const { words } = useTypeSelector((state) => state.book);
  const statistic = useTypeSelector((state) => state.statistic);
  const { userID, token } = useTypeSelector((state) => state.auth);
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  const { setFetch, bookRandomWord } = useSetWordsState();
  const [lastPage, setLastPage] = useState(Number.parseInt(query.get('page')));
  const [lastGroup, setLastGroup] = useState(Number.parseInt(query.get('group')));
  const dispatch = useDispatch();

  const [series, setSeries] = useState(1);
  const [countSeries, setSountSeries] = useState(1);

  const location = useLocation();
  const gameName = /\w+/.exec(location.pathname)[0];

  useEffect(() => {
    if (bookRandomWord.length) {
      setWords(bookRandomWord);
    }
  }, [bookRandomWord]);

  const changeDifficulty = (group: string) => {
    const page = getRandomInt(0, 30);
    setLastPage(page);
    setLastGroup(Number(group));
    setFetch(Number(group), page);
  };

  const getPrevPageWords = () => {
    if (lastPage !== 0) {
      switch (query.get('path')) {
        case 'book':
          setFetch(lastGroup, lastPage - 1);
          break;
        case 'hard':
          dispatch(getAggregatedWords(userID, token, 'hard', lastPage - 1));
          setWords(paginatedResults);
          break;
        case 'learn':
          dispatch(getAggregateLearndWords(userID, token, lastPage - 1));
          setWords(paginatedResults);
          break;
        default:
          setFetch(lastGroup, lastPage - 1);
          break;
      }
      setLastPage(lastPage - 1);
      return true;
    } else {
      return false;
    }
  };

  const checkSeries = () => {
    setSountSeries(countSeries + 1);

    if (countSeries >= series) {
      setSeries(countSeries);
      dispatch(statisticSetSeries(userID, token, statistic, gameName, series));
    }
  };

  const checkWords = (word: Word, result: boolean): void => {
    if (!token) return;

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
        dispatch(statisticSetCorrect(userID, token, statistic, gameName));
        checkSeries();
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
        dispatch(statisticSetIncorrect(userID, token, statistic, gameName));
        setSountSeries(0);
      }
    } else {
      if (result) {
        dispatch(SetUserWord(word.id, 'learn', userID, token, 1));
        dispatch(statisticSetCorrect(userID, token, statistic, gameName));
        dispatch(statisticSetLern(userID, token, statistic, gameName));
        checkSeries();
      } else {
        dispatch(SetUserWord(word.id, 'learn', userID, token, 0, 1));
        dispatch(statisticSetIncorrect(userID, token, statistic, gameName));
        dispatch(statisticSetLern(userID, token, statistic, gameName));
        setSountSeries(0);
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
  }, []);
  return (
    <CheckPositionContext.Provider value={{ gameWords, checkWords, getPosition, changeDifficulty, getPrevPageWords }}>
      {children}
    </CheckPositionContext.Provider>
  );
};
