import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAggregateLearndWords } from '../../store/actions/aggregatedWords';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import Card from './../../components/Card/Card';
import { ChoiceGameTopMenu } from '../ChoiceGameTopMenu';
import { Pagination } from 'react-bootstrap';
import { useQuery } from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';

export const DictionaryLearn: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { token, userID } = useTypeSelector((state) => state.auth);
  const { paginatedResults, totalCount } = useTypeSelector((state) => state.aggregatedWords);
  const maxPage = Math.trunc(Number(totalCount) / 20);
  const query = useQuery();
  const [page, setPage] = useState(Number(query.get('page')));
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    if (token) {
      dispatch(getAggregateLearndWords(userID, token, Number(query.get('page'))));
    }
  }, [query.get('page')]);

  const changePage = (value: number): void => {
    history.push(`/dictionary/learn?page=${value}`);
    setPage(value);
  };

  if (!totalCount) {
    return <h1>Слов нету</h1>;
  }

  return (
    <>
      <h1>Dictionary Learn</h1>
      <ChoiceGameTopMenu pathWords={'learn'} />
      <div className="dictionary-cards-wrapper">
        {paginatedResults.map((elem, i) => {
          return <Card key={i} data={elem} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />;
        })}
      </div>
      <Pagination>
        <Pagination.First onClick={() => changePage(0)} disabled={page === 0} />
        <Pagination.Prev onClick={() => changePage(page - 1)} disabled={page === 0} />
        <Pagination.Item active>{page + 1}</Pagination.Item>

        <Pagination.Next onClick={() => changePage(page + 1)} disabled={page === maxPage} />
        <Pagination.Last onClick={() => changePage(maxPage)} disabled={page === maxPage} />
      </Pagination>
    </>
  );
};
