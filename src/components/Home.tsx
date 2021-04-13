import React from 'react';
import { Container } from 'react-bootstrap';
import { Video } from './video/Video';

export const Home: React.FC = () => {
  const src = 'https://www.youtube.com/watch?v=BuaZF0vItXI'; // video source

  return (
    <main className="main_home__wrapper">
      <Container>
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
          <h4>
            RS LANG поможет вам в изучении английского языка. Основой лёгкого изучения является игровой подход, который
            обеспечит лучшую запоминаемость и быстрое усвоение новых слов.
          </h4>
        </Container>
      </Container>
      <Container>
        <Container>
          <div className="video_container">
            <Video src={src}></Video>
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
            <h4>Репозиторий проекта: https://github.com/rybakouvlad/rslang</h4>
          </a>
        </Container>
      </Container>
    </main>
  );
};
