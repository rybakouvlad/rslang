import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePageAndGroup, changeWords } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useQuery } from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { PaginationBook } from './PaginationBook';
import { Panel } from './Panel';
import { Spinner } from 'react-bootstrap';
import './book.css';

export const Book: React.FC = () => {
  const dispatch = useDispatch();
  const { page, group, words } = useTypeSelector((state) => state.book);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const pageOfUrl = query.get('page');
    const groupOfUrl = query.get('group');

    if (pageOfUrl || groupOfUrl) {
      dispatch(changePageAndGroup(+pageOfUrl, +groupOfUrl));
    } else {
      changeWordsState();
    }
  }, []);

  useEffect(() => {
    changeWordsState();
  }, [page, group]);

  useEffect(() => {
    history.push(`/book?page=${page}&group=${group}`);
  }, [page, group]);

  const getData = async (): Promise<any> => {
    const response = await fetch(`https://server-team19-rsschool.herokuapp.com/words?group=${group}&page=${page}`);
    const json = await response.json();
    return json;
  };

  const changeWordsState = (): void => {
    setLoading(true);
    getData().then((res) => {
      dispatch(changeWords(res));
      setLoading(false);
    });
  };

  return (
    <div className="book">
      <Panel />
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <ul>
          {words.map((element) => (
            <li key={element.id}>
              {element.word} - {element.wordTranslate}
            </li>
          ))}
        </ul>
      )}
      <PaginationBook />
    </div>
  );
};
