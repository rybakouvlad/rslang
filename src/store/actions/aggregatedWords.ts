import { Dispatch } from 'redux';
import { AggregatedActions, AggregatedWordsTypes } from '../../types/aggregatedWords';

export const getAggregatedWords = (userID: string, userToken: string, difficulty: string, page = 0) => {
  return async (dispatch: Dispatch<AggregatedActions>) => {
    try {
      const data = await fetch(
        `https://server-team19-rsschool.herokuapp.com/users/${userID}/aggregatedWords?page=${page}&wordsPerPage=20&filter=%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22${difficulty}%22%7D%5D%7D`,
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
          totalCount: result[0].totalCount[0].count,
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

export const getAggregateLearndWords = (userID: string, userToken: string, page = 0) => {
  return async (dispatch: Dispatch<AggregatedActions>) => {
    try {
      const data = await fetch(
        `https://server-team19-rsschool.herokuapp.com/users/${userID}/aggregatedWords?page=${page}&wordsPerPage=20&filter=%7B%22%24or%22%3A%5B%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22hard%22%7D%5D%7D%2C%7B%22userWord.difficulty%22%3A%22learn%22%7D%5D%7D`,
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
          totalCount: result[0].totalCount[0].count,
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
