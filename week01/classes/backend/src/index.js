const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const sampleLogMiddleware = (req, resp, next) => {
  const logLabel = `[${req.method.toUpperCase()}] ${req.url}`;
  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};

app.use(sampleLogMiddleware);

let cats = [
  { id: uuid(), name: 'Mozart', age: 1, gender: 'M' },
  { id: uuid(), name: 'Tempestade', age: 2, gender: 'F' },
];

app.get('/cats', (req, resp) => {
  const { name } = req.query

  let result  = cats;

  if(name) {
    result = cats.filter( c => c.name.toLowerCase().includes(name.toLowerCase()) );
  }

  return resp.json(result);
});

app.post('/cats', (req, resp) => {
  const { name, age } = req.body;

  const cat = { id: uuid(), name, age };

  cats = [...cats, cat];

  return resp.json(cat);
});

app.get('/cats/:id', (req, resp) => {
  const { id } = req.params;

  const cat = cats.find( c => c.id == id );

  if(!cat) {
    return resp.status(404).json({ error: 'Cat not found.' });
  }

  return resp.json(cat);
});

app.put('/cats/:id', (req, resp) => {
  const { id } = req.params;

  const catIndex = cats.findIndex( c => c.id === id);

  if(catIndex < 0) {
    return resp.status(404).json({ error: 'Cat not found.'});
  }

  const { name, age } = req.body;
  const cat = { id, name, age };

  cats[catIndex] = cat;

  return resp.status(200).json(cat);
});

app.delete('/cats/:id', (req, resp) => {
  const { id } = req.params;

  const catIndex = cats.findIndex( c => c.id === id);

  if (catIndex < 0) {
    return resp.status(404).json({ error: 'Cat not found.' });
  }

  cats.splice(catIndex, 1);

  return resp.status(204).end();
});

app.listen(3000, () => {
  console.log('Back-end started! 😺');
});
