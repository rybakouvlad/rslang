import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import get from '../../assets/ourGameSounds/get.mp3';
import success from '../../assets/ourGameSounds/success.mp3';
import wrong from '../../assets/ourGameSounds/wrong.mp3';
import { ToggleButton } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { SpinnerZ } from './SpinnerZ';
import { useCheckPosition } from '../../hooks/CheckPositionHook';

export interface I_OurGame {
  length: any;
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

function randomArrSort(): number {
  return Math.random() - 0.5;
}

const removeMarkerWrongWordsEn = () => {
  const wordsEn = document.querySelectorAll('.word');
  wordsEn.forEach((el: any) => {
    el.removeAttribute('data-wrong');
    el.style.background = 'none';
  });
};

const playSound = () => {
  const sounds = {
    getWord: new Audio(get),
    successAnswer: new Audio(success),
    wrongAnswer: new Audio(wrong),
  };
  return sounds;
};
interface I_qq {
  words: I_OurGame[];
}

export const OurGame: React.FC<I_qq> = (props: I_qq) => {
  const isPropsReady = props.words;
  // console.log('isPropsReady', isPropsReady);
  if (!isPropsReady) {
    return <h1>Загрузка</h1>;
  }
  const [words, setWords] = useState(null);
  const [engWords, SetEngWords] = useState(null);
  const { checkWords } = useCheckPosition();
  const [isLoad, setLoad]: any = useState(false);
  const newWords = props.words;
  const [card, setCard] = useState(null);
  const [score, setScore] = useState(0);
  const [findWords, setFindWords] = useState([]);
  const [notCurrentWords, setNotCurrentWords] = useState([]);
  const EngWordElement = useRef(null);
  const fullScreenGame = useRef(null);
  const [soundToggler, setSoundToggler] = useState(true);
  const [saveRadioSoundActifeBtn_ON, setSaveRadioSoundActifeBtn_ON] = useState(1);
  const [saveRadioSoundActifeBtn_OFF, setSaveRadioSoundActifeBtn_OFF] = useState(1);

  useEffect(() => {
    const IsSoundSettings = localStorage.getItem('soundSettingsOurGame');
    if (!IsSoundSettings) {
      localStorage.setItem('soundSettingsOurGame', 'true');
      setSoundToggler(() => true);
      setSaveRadioSoundActifeBtn_ON(() => 1);
      setSaveRadioSoundActifeBtn_OFF(() => 2);
    } else if (IsSoundSettings === 'false') {
      setSoundToggler(() => false);
      setSaveRadioSoundActifeBtn_ON(() => 2);
      setSaveRadioSoundActifeBtn_OFF(() => 1);
    } else if (IsSoundSettings === 'true') {
      setSaveRadioSoundActifeBtn_ON(() => 1);
      setSaveRadioSoundActifeBtn_OFF(() => 2);
    }
  }, []);

  const dragStartHandler = (e: any) => {
    setCard(e);
    if (soundToggler) playSound().getWord.play();
  };
  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };
  const dragOverHandler = (e: any) => {
    e.preventDefault();
    e.target.style.boxShadow = '40px 0px 25px 10px #17a2b8';
  };

  const dropHandeler = (e: any) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none';

    const currentCard: string = card.target.id + '_EN';
    const dropCard: string = e.target.id;
    const isRuMarkerWords = e.target.dataset.ru;
    const isWrongWord = e.target.dataset.wrong;
    if (currentCard === dropCard) {
      // console.log(currentCard, '--', dropCard);
      if (soundToggler) playSound().successAnswer.play();
      setWords((words: any) =>
        words.filter((word: any) => {
          if (word.id === card.target.id && !isWrongWord) {
            checkWords(word, true);
            setScore((prev) => prev + 10);
            setFindWords((prev) => {
              return [...prev.concat([word])];
            });
          }
          return word.id !== card.target.id;
        }),
      );
    } else if (currentCard !== dropCard && !isRuMarkerWords) {
      if (soundToggler) playSound().wrongAnswer.play();
      setScore((prev) => prev - 10);
      e.target.style.background = 'rgba(153, 46, 55, 0.39)';
      words.map((word: any) => {
        if (word.id + '_EN' === dropCard) {
          checkWords(word, false);

          e.target.dataset.wrong = 'wrong';
          setNotCurrentWords((prev) => {
            return [...prev.concat([word])];
          });
        }
      });
    }
  };

  useEffect(() => {
    setLoad(() => true);
    const findWordsSet = new Set(findWords);
    localStorage.setItem('currectWords', JSON.stringify([...findWordsSet]));
  }, [words]);

  const runNewGame = () => {
    localStorage.setItem('previousScore', score.toString());
    removeMarkerWrongWordsEn();
    setScore(() => 0);
    setWords(() => [...newWords]);
    setFindWords(() => []);
    setNotCurrentWords(() => []);
  };

  useEffect(() => {
    const oo: any = [...isPropsReady];
    const tt: any = oo.sort(() => 5);
    SetEngWords(() => tt);
    setWords(() => isPropsReady);
  }, [isPropsReady]);

  const randomArr: any = useMemo(() => {
    if (words) {
      const Arr = [...words];
      return Arr.sort(() => randomArrSort());
    }
  }, [words]);

  useEffect(() => {
    if (words) {
      SetEngWords(() => randomArr);
    }
  });

  const showResultGeme = () => {
    if (!words.length && isLoad && isPropsReady.length) {
      const notCurrentWordsSet: any = new Set([...notCurrentWords]);
      const arrSet: any[] = [];

      notCurrentWordsSet.forEach((element: any) => {
        arrSet.push(element);
      });
      //////////////////////////////
      localStorage.setItem('WrongAnswers', JSON.stringify(arrSet)); // //////////////// НЕ изученные слова
      localStorage.setItem('RightAnswers', JSON.stringify(findWords)); // ///////////// изученные слова
      /////////////////////////////
      return (
        <div>
          <Modal.Dialog centered={true} scrollable={true} className="our_game_result_modal">
            <Modal.Header>
              <p>Wrong answers: {arrSet.length}</p>
              <p>Right answers: {findWords.length}</p>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <ol>
                    {arrSet.map((el: any) => {
                      return (
                        <li key={Date.now() / Math.random()}>
                          {el.word} - {el.wordTranslate}
                        </li>
                      );
                    })}
                  </ol>
                </Col>
                <Col>
                  <ol>
                    {findWords.map((el) => {
                      return (
                        <li key={Date.now() / Math.random()}>
                          {el.word} - {el.wordTranslate}
                        </li>
                      );
                    })}
                  </ol>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <p>Score: {score}</p>
              <Button variant="light" onClick={runNewGame}>
                New Game
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
    }
    return <></>;
  };

  const showFullScreen = () => {
    const isFullscreenEnabled: any = document.fullscreenElement;
    if (!isFullscreenEnabled) {
      fullScreenGame.current.requestFullscreen();
    } else document.exitFullscreen();
  };

  const changeSoundTogglerTrue = () => {
    localStorage.setItem('soundSettingsOurGame', 'true');
    setSoundToggler(() => true);
  };
  const changeSoundTogglerFalse = () => {
    localStorage.setItem('soundSettingsOurGame', 'false');
    setSoundToggler(() => false);
  };

  return (
    <Container ref={fullScreenGame} className="ourGame_wrapper">
      <div className="head_game">
        <h2>Drag and drop</h2>
        <h4>Score: {score}</h4>
      </div>
      <div className="our_game_btn__wrapper">
        <Button variant="outline-info" onClick={runNewGame}>
          New Game
        </Button>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton onClick={changeSoundTogglerTrue} variant="info" value={saveRadioSoundActifeBtn_ON}>
            Sound ON
          </ToggleButton>
          <ToggleButton onClick={changeSoundTogglerFalse} variant="info" value={saveRadioSoundActifeBtn_OFF}>
            Sound OFF
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="outline-info" onClick={showFullScreen}>
          Full Screen
        </Button>
      </div>

      {isPropsReady.length && isLoad && words ? (
        <div className="ourGame_inner">
          <Row ref={EngWordElement}>
            <Col className="col_wrapper">
              {words.map((el: any) => {
                return (
                  <Col
                    md={4}
                    id={el.id}
                    data-ru="ru"
                    className="drag_word"
                    key={el.id}
                    onDrag={(e: any) => (e.target.style.cursor = 'grab')}
                    onDragStart={(e: any) => dragStartHandler(e)}
                    onDragLeave={(e: any) => dragLeaveHandler(e)}
                    onDrop={(e: any) => dropHandeler(e)}
                    draggable={true}
                    xs={6}
                  >
                    {el.wordTranslate}
                  </Col>
                );
              })}
            </Col>
            <Col className="col_wrapper">
              {engWords.map((el: any) => {
                return (
                  <Col
                    style={{ userSelect: 'none' }}
                    key={el.id}
                    md={{ span: 4, offset: 4 }}
                    id={el.id + '_EN'}
                    className="word"
                    onDragStart={(e: any) => dragStartHandler(e)}
                    onDragLeave={(e: any) => dragLeaveHandler(e)}
                    onDragOver={(e: any) => dragOverHandler(e)}
                    onDrop={(e: any) => dropHandeler(e)}
                    xs={6}
                  >
                    {el.word}
                  </Col>
                );
              })}
            </Col>
          </Row>
        </div>
      ) : (
        <SpinnerZ />
      )}

      {isLoad ? showResultGeme() : <div></div>}
    </Container>
  );
};
