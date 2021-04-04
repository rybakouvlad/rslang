import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAggregatedWords } from '../../store/actions/aggregatedWords';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import Card from './../../components/Card/Card';
import { PaginationDictionary } from './PaginationDictionary';
import { useQuery } from '../../hooks/useQuery';

export const DictionaryDeleted: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { token, userID } = useTypeSelector((state) => state.auth);
  const { paginatedResults, totalCount } = useTypeSelector((state) => state.aggregatedWords);
  const dispatch = useDispatch();
  const query = useQuery();
  useEffect(() => {
    if (token) {
      dispatch(getAggregatedWords(userID, token, 'delete', Number(query.get('page'))));
    }
  }, [query.get('page')]);

  if (!totalCount) {
    return <h1>Слов нету</h1>;
  }

  return (
    <>
      <h1>Dictionary Deleted</h1>

      <div className="dictionary-cards-wrapper cards-container">
        {paginatedResults.map((elem, i) => {
          return <Card key={i} data={elem} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />;
        })}
      </div>
      <PaginationDictionary difficulty={'delete'} />
    </>
  );
};
