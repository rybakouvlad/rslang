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
        {element.index}
      </Button>
    );
  });

  return (
    <ButtonGroup aria-label="buttons" onClick={(e: any) => handlerRadioButton(e)}>
      {/*<Button
        style={{ backgroundColor: colors[0], borderColor: colors[0] }}
        variant="outline-primary"
        value="0"
        active={group === 0}
      >
        1
      </Button>
      <Button
        style={{ backgroundColor: colors[1], borderColor: colors[1] }}
        variant="outline-primary"
        value="1"
        active={group === 1}
      >
        2
      </Button>
      <Button
        style={{ backgroundColor: colors[2], borderColor: colors[2] }}
        variant="outline-primary"
        value="2"
        active={group === 2}
      >
        3
      </Button>
      <Button
        style={{ backgroundColor: colors[3], borderColor: colors[3] }}
        variant="outline-primary"
        value="3"
        active={group === 3}
      >
        4
      </Button>
      <Button
        style={{ backgroundColor: colors[4], borderColor: colors[4] }}
        variant="outline-primary"
        value="4"
        active={group === 4}
      >
        5
      </Button>
      <Button
        style={{ backgroundColor: colors[5], borderColor: colors[5] }}
        variant="outline-primary"
        value="5"
        active={group === 5}
      >
        6
      </Button>*/}
      {buttonsMap}
    </ButtonGroup>
  );
};
