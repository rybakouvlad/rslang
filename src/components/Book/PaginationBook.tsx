import React from 'react';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage, changePageByBumber } from '../../store/actions/book';
import { Pagination } from 'react-bootstrap';

export const PaginationBook: React.FC = () => {
  const dispatch = useDispatch();
  const { page } = useTypeSelector((state) => state.book);

  const nextPageHandler = (): void => {
    if (page === 29) {
      return null;
    }
    dispatch(nextPage());
  };

  const previousPageHandler = (): void => {
    if (page === 0) {
      return null;
    }
    dispatch(previousPage());
  };

  const firstPageHandler = (): void => {
    if (page === 0) {
      return null;
    }
    dispatch(changePageByBumber(0));
  };

  const lastPageHandler = (): void => {
    if (page === 29) {
      return null;
    }
    dispatch(changePageByBumber(29));
  };

  return (
    <Pagination>
      <Pagination.First onClick={firstPageHandler} disabled={page === 0} />
      <Pagination.Prev onClick={previousPageHandler} disabled={page === 0} />
      <Pagination.Item active>{page + 1}</Pagination.Item>

      <Pagination.Next onClick={nextPageHandler} disabled={page === 29} />
      <Pagination.Last onClick={lastPageHandler} disabled={page === 29} />
    </Pagination>
  );
};
