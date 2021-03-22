import { Dispatch } from 'redux';
import { AuthActionsTypes, AuthAction } from '../../types/auth';

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
      dispatch({ type: AuthActionsTypes.FETCH_AUTH_SUCCESS, payload: await data.json() });
    } catch (error) {
      dispatch({ type: AuthActionsTypes.FETCH_AUTH_START });
    }
  };
};
