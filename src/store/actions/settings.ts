import { SetTranslateAction, SettingsActionsType, SetButtonsAction } from '../../types/settings';

export const setTranslateSettings = (value: boolean): SetTranslateAction => {
  return {
    type: SettingsActionsType.SET_TRANSLATE_SETTINGS,
    payload: value,
  };
};

export const setButtonsSettings = (value: boolean): SetButtonsAction => {
  return {
    type: SettingsActionsType.SET_BUTTONS_SETTINGS,
    payload: value,
  };
};
