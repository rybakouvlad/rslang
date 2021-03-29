import { Dispatch } from 'redux';
import { AggregatedActions, AggregatedWordsTypes } from '../../types/aggregatedWords';

export const getAggregatedWords = (userID: string, userToken: string, difficulty: string) => {
  return async (dispatch: Dispatch<AggregatedActions>) => {
    try {
      const data = await fetch(
        `https://server-team19-rsschool.herokuapp.com/users/${userID}/aggregatedWords?filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${difficulty}%22%7D%5D%7D`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      const result = await data.json();
      console.log(result);
      dispatch({ type: AggregatedWordsTypes.GET_AGGREGATED_WORDS, payload: { ...result[0] } });
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};
