import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { testWords } from '../AudioCallGame/testWords';
import './OurGameStyle.css';

// export interface I_OurGame {
//   id: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   textExampleTranslate: string;
//   textMeaningTranslate: string;
//   wordTranslate: string;
// }

// function randomArrSort(): number {
//   return Math.random() - 0.5;
// }

const removeMarkerWrongWordsEn = () => {
  const wordsEn = document.querySelectorAll('.word');
  wordsEn.forEach((el: any) => {
    el.removeAttribute('data-wrong');
    el.style.background = 'none';
  });
};

export const OurGame: React.FC = () => {
  const [words, setWords] = useState(testWords);
  const newWords = testWords;
  const [card, setCard] = useState(null);
  const [score, setScore] = useState(0);
  const [findWords, setFindWords] = useState([]);
  const [notCurrentWords, setNotCurrentWords] = useState([]);
  const EngWordElement = useRef(null);
  // const Arr = [...words];

  // const randomArr = useMemo(() => {
  //   return Arr.sort(randomArrSort);
  // }, [words]);

  const dragStartHandler = (e: any) => {
    setCard(e);
  };
  const dragLeaveHandler = (e: any) => {
    console.log(e);
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
      console.log(currentCard, '--', dropCard);
      setWords((words) =>
        words.filter((word) => {
          if (word.id === card.target.id && !isWrongWord) {
            setScore((prev) => prev + 10);
            setFindWords((prev) => {
              return [...prev.concat([word])];
            });
          }
          return word.id !== card.target.id;
        }),
      );
    } else if (currentCard !== dropCard && !isRuMarkerWords) {
      setScore((prev) => prev - 10);
      e.target.style.background = 'rgba(153, 46, 55, 0.39)';
      words.map((word) => {
        if (word.id + '_EN' === dropCard) {
          e.target.dataset.wrong = 'wrong';
          setNotCurrentWords((prev) => {
            return [...prev.concat([word])];
          });
        }
      });
    }
  };

  useEffect(() => {
    const findWordsSet = new Set(findWords);
    localStorage.setItem('currectWords', JSON.stringify([...findWordsSet]));
    console.log('find words', findWordsSet);
  }, [words]);

  const runNewGame = () => {
    localStorage.setItem('previousScore', score.toString());
    words.map((el: any, index: number) => {
      console.log(index);
    });
    const getGame = JSON.parse(localStorage.getItem('previousGame'));
    console.log(getGame);
    console.log(EngWordElement.current);
    removeMarkerWrongWordsEn();
    setScore(() => 0);
    setWords(() => [...newWords]);
    setFindWords(() => []);
    setNotCurrentWords(() => []);
  };

  const showResultGeme = () => {
    if (!words.length) {
      const notCurrentWordsSet: any = new Set([...notCurrentWords]);
      const arrSet: any[] = [];

      notCurrentWordsSet.forEach((element: any) => {
        arrSet.push(element);
      });
      //////////////////////////////
      localStorage.setItem('WrongAnswers', JSON.stringify(arrSet)); // отправить на сервер как НЕ изученные слова
      localStorage.setItem('RightAnswers', JSON.stringify(findWords)); // отправить на сервер как изученные слова
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
                  <ul>
                    {arrSet.map((el: any) => {
                      return (
                        <li key={Date.now() / Math.random()}>
                          {el.word} - {el.wordTranslate}
                        </li>
                      );
                    })}
                  </ul>
                </Col>
                <Col>
                  <ul>
                    {findWords.map((el) => {
                      return (
                        <li key={Date.now() / Math.random()}>
                          {el.word} - {el.wordTranslate}
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
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

  return (
    <Container className="ourGame_wrapper">
      <div className="head_game">
        <h4>Score: {score}</h4>
      </div>
      <Button variant="outline-info" onClick={runNewGame}>
        New Game
      </Button>
      <div className="ourGame_inner">
        <Row ref={EngWordElement}>
          <Col className="col_wrapper">
            {words.map((el) => {
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
            {words.map((el: any) => {
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
      {showResultGeme()}
    </Container>
  );
};
