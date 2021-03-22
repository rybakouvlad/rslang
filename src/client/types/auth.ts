export interface IAuth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  loading?: boolean;
}

export enum AuthActionsTypes {
  FETCH_AUTH_START = 'FETCH_AUTH_START',
  FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS',
  FETCH_AUTH_ERROR = 'FETCH_AUTH_ERROR',
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

export type AuthAction = FetchAuthStartAction | FetchAuthErrorAction | FetchAuthSucces;
