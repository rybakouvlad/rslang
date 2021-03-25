import React from 'react';
import { IData } from './dataForCard';
// import audio from '../../assets/svg/audio.svg'
import { ReactComponent as AudioSvg } from '../../assets/svg/audio.svg';
import './card.scss';

interface CardProps {
  data: IData;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const {
    word,
    image,
    // audio,
    // audioMeaning,
    // audioExample,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
    wordTranslate,
  } = props.data;

  const SERVER_PATH = 'https://server-team19-rsschool.herokuapp.com';

  return (
    <li className="card">
      <img className="card__image" src={`${SERVER_PATH}/${image}`}></img>
      <div className="card__word">
        <div>{word}</div>
        <div style={{ display: 'flex' }}>
          <div>{transcription}</div>
          <div className="card-audio">
            <AudioSvg />
          </div>
        </div>
        <div>{wordTranslate}</div>
      </div>
      <span className="card__meaning" dangerouslySetInnerHTML={{ __html: textMeaning }} />
      <span className="card__example" dangerouslySetInnerHTML={{ __html: textExample }} />
      <span className="card__example-translate">{textExampleTranslate}</span>
      <span className="card__meaning-translate">{textMeaningTranslate}</span>
    </li>
  );
};

export default Card;
