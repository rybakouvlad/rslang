import React from 'react';
import { Word } from '../../types/book';
import { ReactComponent as AudioSvg } from '../../assets/svg/audio.svg';
import './card.scss';
// import {changePageAndGroup} from "../../store/actions/book";
import {useDispatch} from "react-redux";
import {SetUserWord, UpdateUserWord} from '../../store/actions/userWords';
import {useTypeSelector} from "../../hooks/useTypesSelector";
import classNames from 'classnames';

interface CardProps {
  data: Word;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (param: boolean) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const dispatch = useDispatch();
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  const { userId, token } = useTypeSelector((state) => state.auth);

  const {
    id,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
    wordTranslate,
  } = props.data;
  const { isAudioPlaying, setIsAudioPlaying } = props;

  const SERVER_PATH = 'https://server-team19-rsschool.herokuapp.com';

  const playAudioSequence = () => {
    if (isAudioPlaying) return;
    setIsAudioPlaying(true);

    const audioArray = [audio, audioMeaning, audioExample];

    let index = 1;
    const audioObj = new Audio();

    audioObj.src = `${SERVER_PATH}/${audioArray[0]}`;
    audioObj.play();

    audioObj.onended = function () {
      if (index < audioArray.length) {
        audioObj.src = `${SERVER_PATH}/${audioArray[index]}`;
        audioObj.play();
        index++;
      } else {
        setIsAudioPlaying(false);
      }
    };
  };

  const hardWordHandler = () => {
    console.log(wordsSettings)
    if(!wordsSettings.has(id)){
      console.log('$$$$$$$$$$4 id: ', id);
      dispatch(SetUserWord(id, 'hard', userId, token));
      console.log(wordsSettings)
    }

  }
  const deleteWordHandler = () => {
    if(!wordsSettings.has(id)) {
      console.log('$$$$$$$$$$4 id: ', id);
      dispatch(SetUserWord(id, 'delete', userId, token));
      console.log(wordsSettings)
    } else {
      dispatch(UpdateUserWord(id, 'delete', userId, token));
    }
  }
  const liClasses = classNames({
    'card-book': true,
    'hard-word': wordsSettings.has(id)
  });

  return (
    <li className={liClasses}>
      <img className="card-book__image" src={`${SERVER_PATH}/${image}`} alt="imagine"></img>
      <div className="card-book__word">
        <div>{word}</div>
        <div style={{ display: 'flex' }}>
          <div>{transcription}</div>
          <div className="card-book-audio" onClick={playAudioSequence}>
            <AudioSvg />
          </div>
        </div>
        <div>{wordTranslate}</div>
      </div>
      <span className="card-book__meaning" dangerouslySetInnerHTML={{ __html: textMeaning }} />
      <span className="card-book__example" dangerouslySetInnerHTML={{ __html: textExample }} />
      <span className="card-book__example-translate">{textExampleTranslate}</span>
      <span className="card-book__meaning-translate">{textMeaningTranslate}</span>
      <button onClick={() => hardWordHandler()}>Сложное</button>
      <button onClick={() => deleteWordHandler()}>Удалить</button>
    </li>
  );
};

export default Card;
