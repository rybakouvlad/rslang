import { SettingsActions, SettingsActionsType, SettingsState } from '../../types/settings';
import { load } from 'redux-localstorage-simple';

const initState = load({ namespace: 'rslang_settings' }) || {
  translateChecked: true,
  buttonsChecked: true,
};

const settingsReducer = (state: SettingsState = initState, action: SettingsActions): SettingsState => {
  switch (action.type) {
    case SettingsActionsType.SET_TRANSLATE_SETTINGS:
      return { ...state, translateChecked: action.payload };
    case SettingsActionsType.SET_BUTTONS_SETTINGS:
      return { ...state, buttonsChecked: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
