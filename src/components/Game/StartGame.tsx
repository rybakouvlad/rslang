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
    <div>
      {getPosition() ? (
        <div>
          <div>Вы перишли {getPosition()}</div>
          <Button
            onClick={() => {
              props.setIsStart(false);
            }}
          >
            Начать игру
          </Button>
        </div>
      ) : (
        <>
          <h1>Выберете сложность</h1>
          <DifficultySelection setIsStart={props.setIsStart} />
        </>
      )}
    </div>
  );
};
