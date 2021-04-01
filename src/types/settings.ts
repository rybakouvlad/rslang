export enum SettingsActionsType {
  SET_TRANSLATE_SETTINGS = 'SET_TRANSLATE_SETTINGS',
  SET_BUTTONS_SETTINGS = 'SET_BUTTONS_SETTINGS',
}

export interface SetTranslateAction {
  type: SettingsActionsType.SET_TRANSLATE_SETTINGS;
  payload: boolean;
}

export interface SetButtonsAction {
  type: SettingsActionsType.SET_BUTTONS_SETTINGS;
  payload: boolean;
}

export interface SettingsState {
  translateChecked: boolean;
  buttonsChecked: boolean;
}

export type SettingsActions = SetTranslateAction | SetButtonsAction;
