import React, { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';
import backgroundImage from './assets/background.jpeg'
import Header from './components/Header';

function App() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get('cats')
      .then((res) => {
        setCats(res.data);
    })
    .catch((error) => {
      console.error(error);
      alert('Something bad ocurred!');
    });

  }, []);

  async function handleAddCats() {
    // const newCat = `Gato desconhecido ${Date.now()}`;
    // setCats([...cats, newCat]);
    try {
      const newCat = {
        name: `Caramello ${Date.now()}`,
        age: 6
      };

      const res = await api.post('cats', newCat);

      setCats([...cats, res.data]);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title="Cats" />

      <img width={200} src={backgroundImage} alt="Imagem de fundo"/>

      <ul>
        {cats.map(cat => <li key={cat.id}>{cat.name} {cat.age == 1 ? `${cat.age} ano` : `${cat.age} anos`}</li>)}
      </ul>

      <button type="button" onClick={handleAddCats}>Adicionar Gatos</button>
    </>
  );
}

export default App;
