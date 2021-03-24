import React from 'react';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
//import {useLocation} from 'react-router-dom';
import './book.css';

export const Book: React.FC = () => {
  //console.log(new URLSearchParams(useLocation().search))
  const dispatch = useDispatch();
  const { page, group } = useTypeSelector((state) => state.book);
  // const page = useSelector(state => state.book.page);

  const goToNextPage = () => {
    dispatch(nextPage());
  };

  const goToPrevPage = () => {
    dispatch(previousPage());
  };

  return (
    <div className="book">
      <div className="book-group">1 2 3 4 5</div>
      <div className="book-content">Content</div>
      <div className="control-panel-page">
        <div>
          {' '}
          Page is, {page}, group is {group}{' '}
        </div>
        <button disabled={page === 29 ? true : false} onClick={goToNextPage}>
          +
        </button>
        <button disabled={page === 0 ? true : false} onClick={goToPrevPage}>
          -
        </button>
      </div>
    </div>
  );
};
