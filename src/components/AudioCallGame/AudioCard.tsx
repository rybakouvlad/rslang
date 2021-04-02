import React, { Dispatch, SetStateAction } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAudioGame } from './audioGame.hook';
import { IWord } from './audioGame.hook';
import questionSvg from '../../assets/svg/Question.svg';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { IResults } from './Game';

interface IProps {
  words: IWord[];
  hiddenWord: IWord;
  setResults: Dispatch<SetStateAction<IResults>>;
  results: IResults;
}

export const AudioCard: React.FC<IProps> = (props: IProps) => {
  const { setIsShowResult, isShowResult } = useAudioGame();
  const { checkWords } = useCheckPosition();

  const checkHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsShowResult(true);
    if ((event.target as HTMLButtonElement).dataset.id === props.hiddenWord.id) {
      checkWords(props.hiddenWord, true);
      props.setResults({
        ...props.results,
        correct: props.results.correct + 1,
        correctWords: [...props.results.correctWords, props.hiddenWord],
      });
    } else {
      checkWords(props.hiddenWord, false);
      props.setResults({
        ...props.results,
        incorrect: props.results.incorrect + 1,
        incorrectWords: [...props.results.incorrectWords, props.hiddenWord],
      });
    }
  };

  return (
    <>
      <Card.Img
        className="audiocall-img"
        variant="top"
        src={isShowResult ? `https://server-team19-rsschool.herokuapp.com/${props.hiddenWord.image}` : questionSvg}
      />
      <Card.Body className="audiocall-body">
        <Card.Title>{isShowResult && props.hiddenWord.word}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{isShowResult && props.hiddenWord.transcription}</Card.Subtitle>
        <Card.Title>{isShowResult && props.hiddenWord.wordTranslate}</Card.Title>
        {props.words.map((el, i) => {
          return (
            <Button
              variant={isShowResult ? (el.id === props.hiddenWord.id ? 'success' : 'danger') : 'secondary'}
              key={i}
              data-id={el.id}
              onClick={checkHandler}
              active={isShowResult}
            >
              {el.wordTranslate}
            </Button>
          );
        })}
      </Card.Body>
    </>
  );
};
