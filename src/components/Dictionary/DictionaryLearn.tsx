import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAggregateLearndWords } from '../../store/actions/aggregatedWords';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import Card from './../../components/Card/Card';
import { setStartGameStateEasy } from '../../store/actions/startGameState';
import { DistionaryPropogination } from './DistionaryPropagination';

export const DictionaryLearn: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { token, userID } = useTypeSelector((state) => state.auth);
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);
  const [words, setWords] = useState([]);
  const dispatch = useDispatch();
  const { page, numberOfWordsOnPage } = useTypeSelector((state) => state.dictionary);

  useEffect(() => {
    if (token) {
      dispatch(getAggregateLearndWords(userID, token));
      dispatch(setStartGameStateEasy());
    }
  }, []);

  useEffect(() => {
    const arrayWords = paginatedResults.slice(
      page * numberOfWordsOnPage,
      page * numberOfWordsOnPage + numberOfWordsOnPage,
    );
    setWords(arrayWords);
  }, [paginatedResults, page]);

  return (
    <>
      <h1>Dictionary Learn</h1>
      <div className="dictionary-cards-wrapper">
        {words.map((elem, i) => {
          return <Card key={i} data={elem} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />;
        })}
      </div>
      <DistionaryPropogination words={paginatedResults} />
    </>
  );
};
