import { IAuth, AuthAction, AuthActionsTypes } from '../../types/auth';

const initialState: IAuth = {
  message: '',
  token: '',
  email: '',
  userID: '',
  name: '',
  loading: false,
  error: null,
};

export default function (state: IAuth = initialState, action: AuthAction): IAuth {
  switch (action.type) {
    case AuthActionsTypes.FETCH_AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AuthActionsTypes.FETCH_AUTH_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case AuthActionsTypes.FETCH_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AuthActionsTypes.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AuthActionsTypes.LOGOUT_AUTH:
      return {
        ...initialState,
      };

    case AuthActionsTypes.LOGIN_AUTH: {
      return {
        ...state,
        token: action.payload.token,
        userID: action.payload.userId,
      };
    }
    default:
      return state;
  }
}
