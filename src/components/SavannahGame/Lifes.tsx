import React from 'react';
import full_heart from '../../assets/svg/full_heart.svg';
import empty_heart from '../../assets/svg/empty_heart.svg';

interface LifesProps {
  lifesCounter: number;
}

function Lifes(props: LifesProps) {
  const { lifesCounter } = props;
  const allLifes = 5;
  const burnedLifes = Array.from(Array(allLifes - lifesCounter), (elem) => null);
  const restLifes = Array.from(Array(lifesCounter), (elem) => 1);
  const arrayLifes = [...burnedLifes, ...restLifes];

  return (
    <ul className="lifes-container">
      {arrayLifes.map((life, index) => {
        const srcImg = life === null ? empty_heart : full_heart;
        return (
          <li key={index}>
            <img src={srcImg} width={20} height={20}></img>
          </li>
        );
      })}
    </ul>
  );
}

export default Lifes;
