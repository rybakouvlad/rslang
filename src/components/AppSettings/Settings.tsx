import React from 'react';
import { useDispatch } from 'react-redux';
import { setTranslateSettings, setButtonsSettings } from '../../store/actions/settings';
import { useTypeSelector } from '../../hooks/useTypesSelector';
// import { SetTranslateAction, SetButtonsAction } from '../../types/settings';
import './settings.scss';

// interface SettingsProps {
//   setTranslateSettings: (value: boolean) => SetTranslateAction;
//   setButtonsSettings: (value: boolean) => SetButtonsAction;
// }

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
        <h1 className="settings-header">Settings</h1>
        <div className="settings-main">
          <label>
            <input type="checkbox" onChange={handleTranslate} checked={translateChecked}></input>
            Отображать перевод изучаемого слова и перевод предложений с ним
          </label>
          <label>
            <input type="checkbox" onChange={handleButtons} checked={buttonsChecked}></input>
            Отображать кнопки &quot;Сложные слова&quot; и &quot;Удаленные слова&quot;
          </label>
        </div>
      </div>
    </>
  );
}
