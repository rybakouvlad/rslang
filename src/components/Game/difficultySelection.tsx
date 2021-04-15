import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { useCheckPosition } from '../../hooks/CheckPositionHook';

type OptionType = { label: string; value: string };

interface IProps {
  setIsStart: Dispatch<SetStateAction<boolean>>;
}

const options: OptionType[] = [
  { value: '0', label: 'сложность 1' },
  { value: '1', label: 'сложность 2' },
  { value: '2', label: 'сложность 3' },
  { value: '3', label: 'сложность 4' },
  { value: '4', label: 'сложность 5' },
  { value: '5', label: 'сложность 6' },
];

export const DifficultySelection: React.FC<IProps> = (props: IProps) => {
  const { changeDifficulty } = useCheckPosition();
  const [select, setSelect] = useState(options[0]);
  const changeHandler = (selected?: OptionType): void => {
    setSelect(selected);
  };

  return (
    <>
      <Select
        className="choice-selector"
        defaultValue={{ value: '0', label: 'сложность 1' }}
        onChange={changeHandler}
        options={options}
      />
      <Button variant="info"
        onClick={() => {
          changeDifficulty(select.value);
          props.setIsStart(false);
        }}
      >
        Начать игру
      </Button>
    </>
  );
};
