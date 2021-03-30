import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAudioGame } from './audioGame.hook';
import { IWord } from './audioGame.hook';
import questionSvg from '../../assets/svg/Question.svg';
interface IProps {
  words: IWord[];
  hiddenWord: IWord;
}

export const AudioCard: React.FC<IProps> = (props: IProps) => {
  const { setIsShowResult, isShowResult } = useAudioGame();

  const checkHandler = () => {
    setIsShowResult(true);
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
