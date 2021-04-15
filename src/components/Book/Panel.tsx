import React from 'react';
import { useDispatch } from 'react-redux';
import { changeGroup } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { Button, ButtonGroup } from 'react-bootstrap';
import { colors } from '../../utils/colorsOfCards';

const buttons = [
  {
    index: 0,
  },
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
  {
    index: 5,
  },
];

export const Panel: React.FC = () => {
  const dispatch = useDispatch();
  const { group } = useTypeSelector((state) => state.book);

  const handlerRadioButton = (e: React.FormEvent<HTMLDivElement> | any): void => {
    dispatch(changeGroup(+e.target.value));
  };
  const buttonsMap = buttons.map((element) => {
    return (
      <Button
        key={element.index}
        style={{ backgroundColor: colors[element.index], borderColor: colors[element.index] }}
        variant="outline-primary"
        value={element.index}
        active={group === element.index}
      >
        {element.index + 1}
      </Button>
    );
  });

  return (
    <ButtonGroup aria-label="buttons" onClick={(e: any) => handlerRadioButton(e)}>
      {buttonsMap}
    </ButtonGroup>
  );
};
