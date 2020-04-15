import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  const fib: string[] = [];

  let counter = 0;
  let fn0 = 0;
  let fn1 = 1;
  let result = 0;

  fib.push(`${fn0}`);
  fib.push(`${fn1}`);

  while (counter <= 6) {
    result = fn0 + fn1;
    fn0 = fn1;
    fn1 = result;

    fib.push(`${fn1}`);

    counter += 1;
  }

  return res.json(fib);
});

export default routes;
