import React, { Dispatch, SetStateAction } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAudioGame } from './audioGame.hook';
import { Word } from '../../types/book';
import questionSvg from '../../assets/svg/Question.svg';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { IResults } from './Game';
import { Progress } from './Progress';

interface IProps {
  words: Word[];
  hiddenWord: Word;
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

  if (!props.hiddenWord) {
    return <h1>Загрузка</h1>;
  }

  return (
    <>
      <Card.Img
        className="audiocall-img"
        variant="top"
        src={isShowResult ? `https://server-team19-rsschool.herokuapp.com/${props.hiddenWord.image}` : questionSvg}
      />
      <Card.Body className="audiocall-body">
        <div className="audiocall-text-block">
          <Card.Title hidden={!isShowResult}>{props.hiddenWord.word}</Card.Title>
          <Card.Subtitle hidden={!isShowResult} className="mb-2 text-muted">
            {props.hiddenWord.transcription}
          </Card.Subtitle>
          <Card.Title hidden={!isShowResult}>{props.hiddenWord.wordTranslate}</Card.Title>
        </div>
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
      <Progress correct={props.results.correct} incorrect={props.results.incorrect} />
    </>
  );
};
