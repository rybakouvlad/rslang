import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAggregatedWords } from '../../store/actions/aggregatedWords';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import Card from './../../components/Card/Card';

export const DictionaryDeleted: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { token, userID } = useTypeSelector((state) => state.auth);
  const { paginatedResults } = useTypeSelector((state) => state.aggregatedWords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAggregatedWords(userID, token, 'delete'));
    }
  }, []);
  return (
    <>
      <h1>Dictionary Deleted</h1>
      <div className="dictionary-cards-wrapper">
        {paginatedResults.map((elem, i) => {
          return <Card key={i} data={elem} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />;
        })}
      </div>
    </>
  );
};
