import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useAudioGame } from './audioGame.hook';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { Word } from '../../types/book';
import { IResults } from './Game';
import { Button } from 'react-bootstrap';

interface IProps {
  hiddenWord: Word;
  setResults: Dispatch<SetStateAction<IResults>>;
  results: IResults;
}

export const NextShowButtons: React.FC<IProps> = (props: IProps) => {
  const { isShowResult, nextIndex, setIsShowResult } = useAudioGame();
  const { checkWords } = useCheckPosition();
  const handlerHotKeys = ({ key }: any): void => {
    if (key === 'Enter') {
      nextIndex();
    }
    if (key === 'ArrowRight') {
      setIsShowResult(true);
      checkHandler();
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', handlerHotKeys);
    return () => {
      document.removeEventListener('keyup', handlerHotKeys);
    };
  });
  const checkHandler = () => {
    checkWords(props.hiddenWord, false);
    props.setResults({
      ...props.results,
      incorrect: props.results.incorrect + 1,
      incorrectWords: [...props.results.incorrectWords, props.hiddenWord],
    });
  };
  return (
    <div>
      {isShowResult ? (
        <Button onClick={nextIndex}> Следующее &#9094;</Button>
      ) : (
        <Button
          onClick={() => {
            setIsShowResult(true);
            checkHandler();
          }}
        >
          Не знаю &rarr;
        </Button>
      )}
    </div>
  );
};
