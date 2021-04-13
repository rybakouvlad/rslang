import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';

type OptionType = { label: string; value: string };

interface IProps {
  setGameName: Dispatch<SetStateAction<string>>;
}

const options: OptionType[] = [
  { value: 'audiocall', label: 'Аудиовызов' },
  { value: 'sprint', label: 'Спринт' },
  { value: 'savana', label: 'Савана' },
];

export const StatisticSelector: React.FC<IProps> = (props: IProps) => {
  const changeHandler = (selected?: OptionType): void => {
    props.setGameName(selected.value);
  };

  return (
    <>
      <Select
        className="choice-selector"
        defaultValue={{ value: 'audiocall', label: 'Аудиовызов' }}
        onChange={changeHandler}
        options={options}
      />
    </>
  );
};
