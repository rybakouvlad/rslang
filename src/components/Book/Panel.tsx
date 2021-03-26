import React from 'react';
import { useDispatch } from 'react-redux';
import { changeGroup } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { Button, ButtonGroup } from 'react-bootstrap';

export const Panel: React.FC = () => {
  const dispatch = useDispatch();
  const { group } = useTypeSelector((state) => state.book);

  const handlerRadioButton = (e: React.FormEvent<HTMLDivElement> | any): void => {
    dispatch(changeGroup(+e.target.value));
  };

  return (
    <ButtonGroup aria-label="buttons" onClick={(e: any) => handlerRadioButton(e)}>
      <Button variant="outline-primary" value="0" active={group === 0}>
        1
      </Button>
      <Button variant="outline-primary" value="1" active={group === 1}>
        2
      </Button>
      <Button variant="outline-primary" value="2" active={group === 2}>
        3
      </Button>
      <Button variant="outline-primary" value="3" active={group === 3}>
        4
      </Button>
      <Button variant="outline-primary" value="4" active={group === 4}>
        5
      </Button>
      <Button variant="outline-primary" value="5" active={group === 5}>
        6
      </Button>
    </ButtonGroup>
  );
};
