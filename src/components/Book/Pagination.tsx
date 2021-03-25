import React from 'react';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage } from '../../store/actions/book';

export const Pagination: React.FC = () => {
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

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`} onClick={previousPageHandler}>
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <span className="page-link">{page + 1}</span>
        </li>
        <li className={`page-item ${page === 29 ? 'disabled' : ''}`} onClick={nextPageHandler}>
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
