import { useState } from 'react';

export const useSetWordsState = () => {
  const [bookRandomWord, setBookRandomWord] = useState([]);
  const setFetch = async (group: number, page: number): Promise<any> => {
    try {
      const response = await fetch(`https://server-team19-rsschool.herokuapp.com/words?group=${group}&page=${page}`);
      const json = await response.json();
      console.log(json);

      setBookRandomWord(json);
    } catch (error) {}
  };
  return { setFetch, bookRandomWord };
};
