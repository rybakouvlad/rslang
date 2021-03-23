export interface IAuth {
  message?: string;
  token: string;
  refreshToken?: string;
  userId: string;
  name?: string;
  loading?: boolean;
}

export enum AuthActionsTypes {
  FETCH_AUTH_START = 'FETCH_AUTH_START',
  FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS',
  FETCH_AUTH_ERROR = 'FETCH_AUTH_ERROR',
  LOGOUT_AUTH = 'LOGOUT_AUTH',
  LOGIN_AUTH = 'LOGIN_AUTH',
}

interface LoginAuthAction {
  type: AuthActionsTypes.LOGIN_AUTH;
  payload: {
    userId: string;
    token: string;
  };
}
interface LogoutAuthAction {
  type: AuthActionsTypes.LOGOUT_AUTH;
}
interface FetchAuthErrorAction {
  type: AuthActionsTypes.FETCH_AUTH_ERROR;
  payload: string;
}

interface FetchAuthStartAction {
  type: AuthActionsTypes.FETCH_AUTH_START;
}

interface FetchAuthSucces {
  type: AuthActionsTypes.FETCH_AUTH_SUCCESS;
  payload: IAuth;
}

export type AuthAction =
  | FetchAuthStartAction
  | FetchAuthErrorAction
  | FetchAuthSucces
  | LogoutAuthAction
  | LoginAuthAction;
