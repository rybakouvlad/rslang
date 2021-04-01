import React from 'react';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage, changePageByBumber } from '../../store/actions/dictionary';
import { Pagination } from 'react-bootstrap';
import { Word } from '../../types/book';

interface DistionaryPropoginationProps {
  words: Array<Word>;
}

export const DistionaryPropogination: React.FC<DistionaryPropoginationProps> = (
  props: DistionaryPropoginationProps,
) => {
  const dispatch = useDispatch();
  const { page, numberOfWordsOnPage } = useTypeSelector((state) => state.dictionary);

  const getNumberForValidation = (): number => {
    return Math.floor(props.words.length / numberOfWordsOnPage);
  };

  const nextPageHandler = (): void => {
    if (page === getNumberForValidation()) {
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
    if (page === getNumberForValidation()) {
      return null;
    }
    dispatch(changePageByBumber(getNumberForValidation()));
  };

  return (
    <Pagination>
      <Pagination.First onClick={firstPageHandler} disabled={page === 0} />
      <Pagination.Prev onClick={previousPageHandler} disabled={page === 0} />
      <Pagination.Item active>{page + 1}</Pagination.Item>

      <Pagination.Next onClick={nextPageHandler} disabled={page === getNumberForValidation()} />
      <Pagination.Last onClick={lastPageHandler} disabled={page === getNumberForValidation()} />
    </Pagination>
  );
};
