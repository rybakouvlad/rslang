import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { /*changeGroup,*/ changePageAndGroup, changeWords } from '../../store/actions/book';
import { useTypeSelector } from '../../hooks/useTypesSelector';
import { useQuery } from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { Pagination } from './Pagination';
import { Panel } from './Panel';
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

  /*const handlerRadioButton = (e: React.FormEvent<HTMLDivElement> | any): void => {
    dispatch(changeGroup(+e.target.value));
  };*/

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
      {/* <div>
        <input type="radio" value="0" name="group" checked={group === 0} /> 1
        <input type="radio" value="1" name="group" checked={group === 1} /> 2
        <input type="radio" value="2" name="group" checked={group === 2} /> 3
        <input type="radio" value="3" name="group" checked={group === 3} /> 4
        <input type="radio" value="4" name="group" checked={group === 4} /> 5
        <input type="radio" value="5" name="group" checked={group === 5} /> 6
     </div>*/}
      {loading ? (
        <div className="spinner-border" role="status" />
      ) : (
        <ul>
          {words.map((element) => (
            <li key={element.id}>
              {element.word} - {element.wordTranslate}
            </li>
          ))}
        </ul>
      )}
      <Pagination />
    </div>
  );
};
