import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nextPage, previousPage, changeGroup, changePageAndGroup } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useQuery } from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import './book.css';

export const Book: React.FC = () => {
  const dispatch = useDispatch();
  const { page, group } = useTypeSelector((state) => state.book);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const pageOfUrl = query.get('page');
    const groupOfUrl = query.get('group');

    console.log(pageOfUrl, groupOfUrl);
    console.log('redux', page, group);

    if (pageOfUrl || groupOfUrl) {
      console.log(group, +groupOfUrl);
      changePageAndGroup(+pageOfUrl, +groupOfUrl);
      changeGroup(+groupOfUrl);
      console.log(group);
    }
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page, group]);

  useEffect(() => {
    history.push(`/book?page=${page}&group=${group}`);
  }, [page, group]);

  const getData = async (): Promise<any> => {
    const response = await fetch(`https://server-team19-rsschool.herokuapp.com/words?group=${group}&page=${page}`);
    const json = await response.json();
    return json;
  };

  const nextPageHandler = (): void => {
    dispatch(nextPage());
  };

  const previousPageHandler = (): void => {
    dispatch(previousPage());
  };

  const handlerRadioButton = (e: React.FormEvent<HTMLDivElement> | any): void => {
    dispatch(changeGroup(+e.target.value));
  };

  return (
    <div className="book" onChange={(e) => handlerRadioButton(e)}>
      <div>
        <input type="radio" value="0" name="group" checked={group === 0} /> 1
        <input type="radio" value="1" name="group" checked={group === 1} /> 2
        <input type="radio" value="2" name="group" checked={group === 2} /> 3
        <input type="radio" value="3" name="group" checked={group === 3} /> 4
        <input type="radio" value="4" name="group" checked={group === 4} /> 5
        <input type="radio" value="5" name="group" checked={group === 5} /> 6
      </div>
      {loading ? (
        <div className="spinner-border" role="status" />
      ) : (
        <ul>
          {data.map((element) => (
            <li key={element.id}>
              {element.word} - {element.wordTranslate}
            </li>
          ))}
        </ul>
      )}
      {/*<div className="control-panel-page">
        <button disabled={page === 0 ? true : false} onClick={previousPageHandler}>
          -
        </button>
        <span>{page}</span>
        <button disabled={page === 29 ? true : false} onClick={nextPageHandler}>
          +
        </button>
          </div>*/}
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
          <li className="page-item" onClick={nextPageHandler}>
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
