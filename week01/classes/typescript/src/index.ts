import express from 'express';
import handleHello from './routes/hello';

const app = express();

app.set('port', 3000);

app.get('/hello/:name', handleHello);

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
