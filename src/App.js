import './App.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function App() {
  const [article, setArticle] = useState({
    art: '',
    name: '',
    place: [],
  });
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios
      .get(`https://form.tafontend.online/`)
      .then((d) => setList(d.data))
      .catch((d) => console.log(d));
  }, []);

  const hendlerSendFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    const file = fileField.files[0];

    formData.append('file', file);

    axios
      .post(`https://form.tafontend.online/`, formData)
      .then((i) => setStatus('Успешно'))
      .catch((e) => setStatus(e.response.data.message))
      .finally(() => {
        e.target.reset();
      });
  };

  list.forEach((i) => (i.label = `Артикул: ${i.art}; ${i.name}`));

  return (
    <main className='main'>
      <div className='wrapper'>
        <header className='header'></header>
        <form className='form'>
          <Select
            options={list}
            onChange={(evt) => {
              setArticle(evt);
            }}
            className='react-select-container'
            classNamePrefix='react-select'
          ></Select>
        </form>
        <div className='block block_article'>
          <h2 className='block__title'>Артикул:</h2>
          <span className='block__span block__span_type-article'>
            {article.art || 'Ничего не найдено'}
          </span>
        </div>
        <div className='block block_place'>
          <h2 className='block__title'>Стеллаж:</h2>
          {article.place.length > 0 ? (
            article.place.map((item) => {
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
          <span className='block__span block__span_type-name'>
            {article.name}
          </span>
        </div>
        {navigator.maxTouchPoints > 0 && 'orientation' in window ? null : (
          <form className='form__update_value' onSubmit={hendlerSendFile}>
            <input type='file' accept='.xlsx' />
            <button type='submit' className='button_default button_color-green'>
              Отправить
            </button>
            <span>{status}</span>
          </form>
        )}
      </div>
    </main>
  );
}

export default App;
