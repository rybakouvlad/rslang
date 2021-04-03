import React from 'react';
import { Word } from '../../types/book';
import { ReactComponent as AudioSvg } from '../../assets/svg/audio.svg';
import { useDispatch } from 'react-redux';
import { DeleteUserWord, SetUserWord, UpdateUserWord } from '../../store/actions/userWords';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import classNames from 'classnames';
import { ReactComponent as DeleteSvg } from '../../assets/svg/delete.svg';
import { ReactComponent as AddHardSvg } from '../../assets/svg/add_hard.svg';
import { ReactComponent as HardAddedSvg } from '../../assets/svg/hard_added.svg';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface CardProps {
  data: Word;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (param: boolean) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const dispatch = useDispatch();
  const { wordsSettings } = useTypeSelector((state) => state.userWords);
  const { translateChecked, buttonsChecked } = useTypeSelector((state) => state.settings);
  const { userID, token } = useTypeSelector((state) => state.auth);
  const id = props.data.id ? props.data.id : props.data._id;
  const {
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
    if (!wordsSettings.has(id)) {
      dispatch(SetUserWord(id, 'hard', userID, token));
    }
  };
  const deleteWordHandler = () => {
    if (!wordsSettings.has(id)) {
      dispatch(SetUserWord(id, 'delete', userID, token));
    } else {
      if (wordsSettings.get(id).difficulty === 'delete') {
        dispatch(DeleteUserWord(id, userID, token));
      } else {
        dispatch(UpdateUserWord(id, 'delete', userID, token));
      }
    }
  };
  const liClasses = classNames({
    'card-book': true,
    'hard-word': wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'hard',
  });
  const svgHardClasses = classNames({
    'hard-added-svg': wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'hard',
  });

  const svgDeletedClasses = classNames({
    'deleted-added-svg': wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'delete',
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
        {translateChecked && <div>{wordTranslate}</div>}
      </div>
      <span className="card-book__meaning" dangerouslySetInnerHTML={{ __html: textMeaning }} />
      <span className="card-book__example" dangerouslySetInnerHTML={{ __html: textExample }} />
      {translateChecked && <span className="card-book__example-translate">{textExampleTranslate}</span>}
      {translateChecked && <span className="card-book__meaning-translate">{textMeaningTranslate}</span>}
      {buttonsChecked &&
        ((wordsSettings.has(id) && wordsSettings.get(id).difficulty !== 'delete') || !wordsSettings.has(id)) && (
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                {wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'hard'
                  ? 'Слово было отмечено как сложное'
                  : 'Отметить слово как сложное'}
              </Tooltip>
            }
          >
            <button className="add-hard-btn" onClick={() => hardWordHandler()}>
              {wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'hard' ? (
                <HardAddedSvg className={svgHardClasses} />
              ) : (
                <AddHardSvg />
              )}
            </button>
          </OverlayTrigger>
        )}
      {buttonsChecked && (
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              {wordsSettings.has(id) && wordsSettings.get(id).difficulty === 'delete'
                ? 'Восстановить слово'
                : 'Удалить слово'}
            </Tooltip>
          }
        >
          <button className="add-deleted-btn" onClick={() => deleteWordHandler()}>
            <DeleteSvg className={svgDeletedClasses} />
          </button>
        </OverlayTrigger>
      )}
    </li>
  );
};

export default Card;
