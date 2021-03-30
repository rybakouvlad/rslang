import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

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
  randomGameWords: IWord[];
  setWords: Dispatch<SetStateAction<IWord[]>>;
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
export const shuffle = (arr: Array<any>) => {
  return arr.sort(() => Math.round(Math.random() * 100) - 50);
};
export const AudioCallGameProvider: React.FC = ({ children }: IProps) => {
  const [index, setIndex] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [words, setWords] = useState<IWord[]>();
  const [randomGameWords, setrandomGameWords] = useState<IWord[]>();
  const [gameArr, setGameArr] = useState<IWord[]>([]);
  const [hiddenWord, setHiddenWord] = useState<IWord>();
  const [isEndGame, setIsEndGame] = useState(false);

  const nextIndex = () => {
    if (index === randomGameWords.length - 1) {
      setIsEndGame(true);
    } else {
      setIndex(index + 1);
      setIsShowResult(false);
    }
  };

  const getRandomWords = () => {
    if (!randomGameWords) return;
    const arr = [];
    const randomArr = new Array<number>();
    arr.push(randomGameWords[index]);
    do {
      const random = getRandomInt(0, randomGameWords.length);

      if (
        random !== index &&
        !randomArr.some((el) => {
          return el === random;
        })
      ) {
        randomArr.push(random);
        arr.push(randomGameWords[random]);
      }
    } while (arr.length !== 5);
    return shuffle(arr);
  };

  const playSound = () => {
    const sound = new Audio(`https://server-team19-rsschool.herokuapp.com/${randomGameWords[index].audio}`);
    sound.play();
  };

  const repeatGame = () => {
    setrandomGameWords(shuffle(words));
    setIndex(0);
    setIsShowResult(false);
    setIsEndGame(false);
  };

  useEffect(() => {
    if (words) {
      setrandomGameWords(shuffle(words));
    }
  }, [words]);

  useEffect(() => {
    if (randomGameWords && index < randomGameWords.length) {
      setHiddenWord(randomGameWords[index]);
      setGameArr(getRandomWords());
      playSound();
    }
  }, [randomGameWords, index]);

  return (
    <AudioCallGameContext.Provider
      value={{
        isShowResult,
        index,
        setIsShowResult,
        nextIndex,
        randomGameWords,
        hiddenWord,
        gameArr,
        isEndGame,
        repeatGame,
        playSound,
        setWords,
      }}
    >
      {children}
    </AudioCallGameContext.Provider>
  );
};
