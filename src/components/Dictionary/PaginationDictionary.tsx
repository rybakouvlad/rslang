import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useQuery } from '../../hooks/useQuery';

interface IProps {
  difficulty: string;
}

export const PaginationDictionary: React.FC<IProps> = (props: IProps) => {
  const { totalCount } = useTypeSelector((state) => state.aggregatedWords);
  const maxPage = Math.trunc(Number(totalCount) / 20);
  const query = useQuery();
  const [page, setPage] = useState(Number(query.get('page')));

  const history = useHistory();
  const changePage = (value: number): void => {
    history.push(`/dictionary/${props.difficulty}?page=${value}`);
    setPage(value);
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => changePage(0)} disabled={page === 0} />
      <Pagination.Prev onClick={() => changePage(page - 1)} disabled={page === 0} />
      <Pagination.Item active>{page + 1}</Pagination.Item>

      <Pagination.Next onClick={() => changePage(page + 1)} disabled={page === maxPage} />
      <Pagination.Last onClick={() => changePage(maxPage)} disabled={page === maxPage} />
    </Pagination>
  );
};
