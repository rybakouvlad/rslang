import React, { useEffect, useState } from 'react';
import { AudioCard } from './AudioCard';
import { testWords } from './test';

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
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const Game: React.FC = () => {
  const [words, setWords] = useState<IWord[]>();
  const [index /* , setIndex */] = useState(0);
  const [gameArr, setGameArr] = useState<IWord[]>([]);
  const [hiddenWord, setHiddenWord] = useState<IWord>();

  const getRandomWords = () => {
    if (!words) return;
    const arr = [];
    const randomArr = new Array<number>();
    arr.push(words[index]);
    do {
      const random = getRandomInt(0, words.length);
      console.log('random:' + random);
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

  const shuffle = (arr: any) => {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
  };

  useEffect(() => {
    setWords(shuffle(testWords));
  }, []);

  useEffect(() => {
    if (words) {
      setHiddenWord(words[0]);
      setGameArr(getRandomWords());
    }
  }, [words]);
  console.log(gameArr);

  if (!words || !gameArr) {
    return <h1>Loading</h1>;
  }
  return <AudioCard words={gameArr} hiddenWord={hiddenWord} />;
};
