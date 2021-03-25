import React from 'react';
import { useDispatch } from 'react-redux';
import { changeGroup } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';

export const Panel: React.FC = () => {
  const dispatch = useDispatch();
  const { group } = useTypeSelector((state) => state.book);

  const handlerRadioButton = (e: React.FormEvent<HTMLDivElement> | any): void => {
    dispatch(changeGroup(+e.target.value));
  };

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
      onChange={(e) => handlerRadioButton(e)}
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        value="0"
        autoComplete="off"
        checked={group === 0}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        1
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        value="1"
        autoComplete="off"
        checked={group === 1}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">
        2
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        value="2"
        autoComplete="off"
        checked={group === 2}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">
        3
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio4"
        value="3"
        autoComplete="off"
        checked={group === 3}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio4">
        4
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio5"
        value="4"
        autoComplete="off"
        checked={group === 4}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio5">
        5
      </label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio6"
        value="5"
        autoComplete="off"
        checked={group === 5}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio6">
        6
      </label>
    </div>
  );
};
