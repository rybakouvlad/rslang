import { Dispatch } from 'redux';
import { AuthActionsTypes, AuthAction } from '../../types/auth';

const storageName = 'userData';

export const sendPostAuth = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const data = await fetch('https://server-team19-rsschool.herokuapp.com/signin', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await data.json();
      login(result.userId, result.token);
      dispatch({ type: AuthActionsTypes.FETCH_AUTH_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: AuthActionsTypes.FETCH_AUTH_START });
    }
  };
};

const login = (id: string, token: string) => {
  localStorage.setItem(
    storageName,
    JSON.stringify({
      userId: id,
      token: token,
    }),
  );
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionsTypes.LOGIN_AUTH,
      payload: {
        userId: id,
        token: token,
      },
    });
  };
};

export const logout = () => {
  localStorage.removeItem(storageName);
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionsTypes.LOGOUT_AUTH });
  };
};

export const checkLogin = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      dispatch({
        type: AuthActionsTypes.LOGIN_AUTH,
        payload: {
          userId: data.id,
          token: data.token,
        },
      });
    } else logout;
  };
};
