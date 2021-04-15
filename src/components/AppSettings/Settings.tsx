import React from 'react';
import { useDispatch } from 'react-redux';
import { setTranslateSettings, setButtonsSettings } from '../../store/actions/settings';
import { useTypeSelector } from '../../hooks/useTypesSelector';

export function Settings() {
  const dispatch = useDispatch();
  const { translateChecked, buttonsChecked } = useTypeSelector((state) => state.settings);

  const handleTranslate = ({ target: { checked } }: any): void => {
    dispatch(setTranslateSettings(checked));
  };

  const handleButtons = ({ target: { checked } }: any): void => {
    dispatch(setButtonsSettings(checked));
  };

  return (
    <>
      <div className="settings-container">
        <h1 className="settings-header">Настройки</h1>
        <div className="settings-main">
          <label>
            <input type="checkbox" onChange={handleTranslate} checked={translateChecked}></input>
            <h5>Отображать перевод изучаемого слова и перевод предложений с ним</h5>
          </label>
          <label>
            <input type="checkbox" onChange={handleButtons} checked={buttonsChecked}></input>
            <h5>Отображать кнопки &quot;Сложные слова&quot; и &quot;Удаленные слова&quot;</h5>
          </label>
        </div>
      </div>
    </>
  );
}
