import { SettingsActions, SettingsActionsType, SettingsState } from '../../types/settings';

const initState = {
  translateChecked: true,
  buttonsChecked: true,
};

const settingsReducer = (state: SettingsState = initState, action: SettingsActions): SettingsState => {
  switch (action.type) {
    case SettingsActionsType.SET_TRANSLATE_SETTINGS:
      console.log('check');
      return { ...state, translateChecked: action.payload };
    case SettingsActionsType.SET_BUTTONS_SETTINGS:
      return { ...state, buttonsChecked: action.payload };
    default:
      console.log('check1');

      return state;
  }
};

export default settingsReducer;
