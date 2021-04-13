import React from 'react';
import { Container } from 'react-bootstrap';
import { Video } from './video/Video';

export const Home: React.FC = () => {
  const src = 'https://www.youtube.com/watch?v=BuaZF0vItXI'; // video source

  return (
    <main className="main_home__wrapper">
      <a
        className="home_title"
        href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/react-rslang.md"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <h1>RS LANG</h1>
        <div></div>
      </a>
      <Container>
        <div className="video_container">
          <Video src={src}></Video>
        </div>
        <a
          className="home_title"
          href="https://github.com/rybakouvlad/rslang"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <h4>Репозиторий проекта</h4>
          <div></div>
        </a>
      </Container>
    </main>
  );
};
