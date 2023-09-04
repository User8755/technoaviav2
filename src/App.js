/* eslint-disable array-callback-return */
import './App.css';
import list from './untils/list';
import { useEffect, useState } from 'react';
import Select from 'react-select';
function App() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState([]);
  const [isName, setName] = useState('');
  const [isArticle, setArticle] = useState('');
  const [isPlace, setPlace] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const hendlerSearch = (evt) => {
    evt.preventDefault();
    const find = [];
    list.map((item) => {
      if (item.art === input) {
        find.push(item);
      } else {
        setName('');
        setArticle('Ничего не найдено');
        setPlace('');
      }
      return setSearch(find);
    });
  };

  useEffect(() => {
    if (search) {
      const place = [];
      search.map((item) => {
        setName(item.name);
        setArticle(item.art);
        place.push(item.place);
        setPlace(place);
      });
    }
  }, [setName, search]);

  useEffect(() => {
    if (list) {
      const table = {};
      const res = list.filter(({ art }) => !table[art] && (table[art] = 1));
      setSearchList(res);
    }
  }, []);
  const [option, setOption] = useState([]);
  useEffect(() => {
    const arr = [];
    searchList.map((item) => {
      arr.push({ value: item.art, label: item.name });
      setOption(arr);
    });
  }, [searchList]);

  // const handlerChange = (evt) => {
  //   setInput(evt.target.value);
  // };

  return (
    <main className='main'>
      <div className='wrapper'>
        <header className='header'></header>
        <form className='form' onSubmit={hendlerSearch}>
          {/* <input
          className='input'
          placeholder='Введите артикул'
          onChange={handlerChange}
          list='data'
          inputMode='numeric'
          autoComplete='on'
        />
        <datalist id='data' className='option'>
          {searchList.map((item) => {
            return <option value={item.art}>{item.name}</option>;
          })}
        </datalist> */}
          <Select
            options={option}
            onChange={(evt) => {
              setInput(evt.value);
            }}
            className='react-select-container'
            classNamePrefix='react-select'
          ></Select>
          <button className='button' type='submit'>
            Отправить
          </button>
        </form>
        <div className='block block_article'>
          <h2 className='block__title'>Артикул:</h2>
          <span className='block__span block__span_type-article'>
            {isArticle || 'Ничего не найдено'}
          </span>
        </div>
        <div className='block block_place'>
          <h2 className='block__title'>Стеллаж:</h2>
          {isPlace.length > 0 ? (
            isPlace.map((item) => {
              return (
                <span className='block__span block__span_type-place'>
                  {item}
                </span>
              );
            })
          ) : (
            <span className='block__span block__span_type-place'></span>
          )}
        </div>
        <div className='block'>
          <h2 className='block__title'>Наименование:</h2>
          <span className='block__span block__span_type-name'>{isName}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
