import 'reflect-metadata';
import express from 'express';
import './database';
import routes from './routes';
import configUpload from './config/upload';

const app = express();

app.use(express.json());

app.use('/files', express.static(configUpload.dir));

app.use(routes);

app.listen(3000, () => {
  console.log('😺 Server listen on port 3000!');
});
