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
      if (!result) return;
      dispatch({
        type: AggregatedWordsTypes.GET_AGGREGATED_WORDS,
        payload: {
          totalCount: result[0].totalCount.count,
          paginatedResults: result[0].paginatedResults.map((el: any) => {
            return { ...el, id: el._id };
          }),
        },
      });
    } catch (error) {
      console.log('ERROR!!!!!!!!!!!!!!', error);
    }
  };
};
