import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { testWords } from './testWords';

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

interface IContext {
  isShowResult: boolean;
  index: number;
  setIsShowResult: Dispatch<SetStateAction<boolean>>;
  nextIndex(): void;
  words: IWord[];
  gameArr: IWord[];
  hiddenWord: IWord;
  isEndGame: boolean;
  repeatGame(): void;
  playSound(): void;
}

interface IProps {
  children: React.ReactNode;
}

const AudioCallGameContext = createContext<IContext>(null);

export const useAudioGame = () => {
  return useContext(AudioCallGameContext);
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const AudioCallGameProvider: React.FC = ({ children }: IProps) => {
  const [index, setIndex] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [words, setWords] = useState<IWord[]>();
  const [gameArr, setGameArr] = useState<IWord[]>([]);
  const [hiddenWord, setHiddenWord] = useState<IWord>();
  const [isEndGame, setIsEndGame] = useState(false);

  const nextIndex = () => {
    if (index === words.length - 1) {
      setIsEndGame(true);
    } else {
      setIndex(index + 1);
      setIsShowResult(false);
    }
  };

  const getRandomWords = () => {
    if (!words) return;
    const arr = [];
    const randomArr = new Array<number>();
    arr.push(words[index]);
    do {
      const random = getRandomInt(0, words.length);

      if (
        random !== index &&
        !randomArr.some((el) => {
          return el === random;
        })
      ) {
        randomArr.push(random);
        arr.push(words[random]);
      }
    } while (arr.length !== 5);
    return shuffle(arr);
  };

  const shuffle = (arr: Array<any>) => {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
  };

  const playSound = () => {
    const sound = new Audio(`https://server-team19-rsschool.herokuapp.com/${words[index].audio}`);
    sound.play();
  };

  const repeatGame = () => {
    setWords(shuffle(testWords));
    setIndex(0);
    setIsShowResult(false);
    setIsEndGame(false);
  };

  useEffect(() => {
    setWords(shuffle(testWords));
  }, []);

  useEffect(() => {
    if (words && index < words.length) {
      setHiddenWord(words[index]);
      setGameArr(getRandomWords());
      playSound();
    }
  }, [words, index]);
  return (
    <AudioCallGameContext.Provider
      value={{
        isShowResult,
        index,
        setIsShowResult,
        nextIndex,
        words,
        hiddenWord,
        gameArr,
        isEndGame,
        repeatGame,
        playSound,
      }}
    >
      {children}
    </AudioCallGameContext.Provider>
  );
};
