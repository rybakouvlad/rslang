import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { getRandomInt } from '../../utils/getRandomInt';
import { shuffle } from '../../utils/getShuffle';
import { Word } from '../../types/book';
interface IContext {
  isShowResult: boolean;
  index: number;
  setIsShowResult: Dispatch<SetStateAction<boolean>>;
  nextIndex(): void;
  randomGameWords: Word[];
  setWords: Dispatch<SetStateAction<Word[]>>;
  gameArr: Word[];
  hiddenWord: Word;
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

export const AudioCallGameProvider: React.FC = ({ children }: IProps) => {
  const [index, setIndex] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [words, setWords] = useState<Word[]>();
  const [randomGameWords, setrandomGameWords] = useState<Word[]>();
  const [gameArr, setGameArr] = useState<Word[]>([]);
  const [hiddenWord, setHiddenWord] = useState<Word>();
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
