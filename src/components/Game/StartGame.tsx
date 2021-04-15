import React, { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import { useCheckPosition } from '../../hooks/CheckPositionHook';
import { DifficultySelection } from './difficultySelection';

interface IProps {
  setIsStart: Dispatch<SetStateAction<boolean>>;
}

export const StartGame: React.FC<IProps> = (props: IProps) => {
  const { getPosition } = useCheckPosition();

  return (
    <div className="start-game">
      {getPosition() ? (
        <>
          <h2>Вы перишли {getPosition()}</h2>
          <Button
            variant="info"
            onClick={() => {
              props.setIsStart(false);
            }}
          >
            Начать игру
          </Button>
        </>
      ) : (
        <>
          <h2>Выберите сложность</h2>
          <DifficultySelection setIsStart={props.setIsStart} />
        </>
      )}
    </div>
  );
};
