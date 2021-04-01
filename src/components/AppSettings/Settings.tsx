import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTranslateSettings, setButtonsSettings } from '../../store/actions/settings';
import { SetTranslateAction, SetButtonsAction } from '../../types/settings';
import './settings.scss';

interface SettingsProps {
  setTranslateSettings: (value: boolean) => SetTranslateAction;
  setButtonsSettings: (value: boolean) => SetButtonsAction;
}

export class Settings extends Component<SettingsProps> {
  handleTranslate = ({ target: { checked } }: any): void => {
    const { setTranslateSettings } = this.props;
    setTranslateSettings(checked);
  };

  handleButtons = ({ target: { checked } }: any): void => {
    const { setButtonsSettings } = this.props;
    setButtonsSettings(checked);
  };

  render() {
    return (
      <>
        <div className="settings-container">
          <h1 className="settings-header">Settings</h1>
          <div className="settings-main">
            <label>
              <input type="checkbox" onChange={this.handleTranslate}></input>
              Отображать перевод изучаемого слова и перевод предложений с ним
            </label>
            <label>
              <input type="checkbox" onChange={this.handleButtons}></input>
              Отображать кнопки &quot;Сложные слова&quot; и &quot;Удаленные слова&quot;
            </label>
          </div>
        </div>
      </>
    );
  }
}

connect(null, { setTranslateSettings, setButtonsSettings })(Settings);
