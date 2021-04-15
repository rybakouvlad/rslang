import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Video } from './video/Video';
import enPng from '../assets/img/en1.svg';

export const Home: React.FC = () => {
  const src = 'https://www.youtube.com/watch?v=BuaZF0vItXI'; // video source

  return (
    <main className="main_home__wrapper">
      {/* <Container>
        <Container>
          <a
            className="home_title"
            href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <h1>RS LANG</h1>
          </a>
        </Container>
        <Container>
          <p className="home_text">
            RS LANG поможет вам в изучении английского языка. Основой лёгкого изучения является игровой подход, который
            обеспечит лучшую запоминаемость и быстрое усвоение новых слов.
          </p>
        </Container>
      </Container>
      <Container>
        <Container>
          <div className="video_container">
            <Video src={src}></Video>
            <div className="english_png">
              <a
                className="english_png__link"
                target="_blank"
                style={{ textDecoration: 'none' }}
                href="https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%81%D1%82%D1%80%D0%B0%D0%BD,_%D0%B3%D0%B4%D0%B5_%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F_%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%BC"
                rel="noreferrer"
              >
                <img src={enPng} alt="En" />
                <h6>Learn once, Speak anywhere!</h6>
              </a>
            </div>
          </div>
        </Container>
        <Container>
          <a
            className="home_title"
            href="https://github.com/rybakouvlad/rslang"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <p className="home_text">Репозиторий проекта: https://github.com/rybakouvlad/rslang</p>
          </a>
        </Container>
      </Container> */}
      <Container>
        <Row>
          <a
            className="home_title"
            href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <h1>RS LANG</h1>
          </a>
        </Row>
        <Row>
          <p className="home_text">
            RS LANG поможет вам в изучении английского языка. Основой лёгкого изучения является игровой подход, который
            обеспечит лучшую запоминаемость и быстрое усвоение новых слов.
          </p>
        </Row>
        <Row className="video_container">
          <Col>
            <Video src={src}></Video>
          </Col>
          <Col>
            <div className="english_png">
              <a
                className="english_png__link"
                target="_blank"
                style={{ textDecoration: 'none' }}
                href="https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%81%D1%82%D1%80%D0%B0%D0%BD,_%D0%B3%D0%B4%D0%B5_%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F_%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%BC"
                rel="noreferrer"
              >
                <img src={enPng} alt="En" />
                <h6>Learn once, Speak anywhere!</h6>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <a
            className="home_title"
            href="https://github.com/rybakouvlad/rslang"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <p className="home_text">Репозиторий проекта: https://github.com/rybakouvlad/rslang</p>
          </a>
        </Row>
      </Container>
    </main>
  );
};
