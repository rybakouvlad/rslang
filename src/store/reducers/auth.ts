import { IAuth, AuthAction, AuthActionsTypes } from '../../types/auth';

const initialState: IAuth = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
};

export default function (state: IAuth = initialState, action: AuthAction): IAuth {
  switch (action.type) {
    case AuthActionsTypes.FETCH_AUTH_START:
      return {
        ...state,
      };
    case AuthActionsTypes.FETCH_AUTH_SUCCESS:
      return {
        ...action.payload,
      };
    case AuthActionsTypes.FETCH_AUTH_ERROR:
      return {
        ...state,
      };
    case AuthActionsTypes.LOGOUT_AUTH:
      return {
        ...initialState,
      };
    case AuthActionsTypes.LOGIN_AUTH: {
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    }
    default:
      return state;
  }
}
